// See https://github.com/stripe/stripe-node/blob/master/examples/webhook-signing/nextjs/pages/api/webhooks.ts
import { stripe } from '@/lib/stripe/config';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

async function handleStripeWebhook(body: any) {
  // const mode = body.data?.object?.mode;
  // const id = body.data?.object?.id;
  // const obj = body.data?.object?.object;
  // const stat = body.data?.object?.status;
  // const status = body.data?.object?.payment_status;
  // const payment_intent = body.data?.object?.payment_intent;
  // const subId = body.data?.object?.subscription;
  // const stripeInvoiceId = body.data?.object?.invoice;
  // const stripe_invoice = body.data?.object?.invoice;
  const type = body.type;

  // console.log('webhook type --->', type);
  // console.log('id --->', id);
  // console.log('obj --->', obj);
  // console.log('stat --->', stat);
  // console.log('status --->', status);
  // console.log('payment_intent --->', payment_intent);
  // console.log('subId --->', subId);
  // console.log('stripeInvoiceId --->', stripeInvoiceId);
  // console.log('userId --->', userId);
  // console.log('stripe_invoice --->', stripe_invoice);

  // Switch on the event type.
  switch (type) {
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Session Expired.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a session expires.
     */
    case 'checkout.session.expired':
      // logic to handle expired sessions.

      return new Response(
        JSON.stringify({ message: 'Payments marked canceled!' }),
        {
          status: 200,
        }
      );
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge: Succeeded.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a payment is successful.
     */
    case 'charge.succeeded':
      // logic to handle successful charges.

      return new Response(JSON.stringify({ message: 'Payment completed!' }), {
        status: 200,
      });

    case 'checkout.session.completed':
      // metadata to use in DB functions
      const session = body.data.object;
      const metadata = session.metadata || {};

      if (metadata) {
        const userId = metadata.userId;
        const sellerId = metadata.sellerId;
        const itemId = metadata.itemId;
        const itemName = metadata.itemName;
        const cartId = metadata.cartId;
        const price = metadata.price;
        const checkoutSessionId = metadata.sessionId;

        // DB ACTIONS HERE : TODO
        const updateDb = async () => {
          
        };

        updateDb();
      }

      return new Response(
        JSON.stringify({ message: 'Checkout Session completed!' }),
        {
          status: 200,
        }
      );
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge: Refunded.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a refund is completed.
     */
    case 'charge.refunded':
      // logic to handle refunded charges.

      return new Response(JSON.stringify({ message: 'Refund completed!' }), {
        status: 200,
      });
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge: Refunded.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a charge fails.
     */
    case 'charge.failed':
      // logic to handle failed charges.

      return new Response(JSON.stringify({ message: 'Payment Updated!' }), {
        status: 200,
      });
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge: Expired.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a charge expires.
     */
    case 'charge.expired':
      // logic to handle expired charges.

      return new Response(JSON.stringify({ message: 'Payment Updated!' }), {
        status: 200,
      });
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge Dispute: Created.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a dispute is created.
     */
    case 'charge.dispute.created':
      // logic here...

      return new Response(
        JSON.stringify({ message: 'Dispute details added!' }),
        {
          status: 200,
        }
      );
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge Dispute: Updated.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a dispute is created.
     */
    case 'charge.dispute.updated':
      // logic here...

      return new Response(
        JSON.stringify({ message: 'Dispute details updated!' }),
        {
          status: 200,
        }
      );
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge Dispute: Funds re-instated.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a dispute\'s funds are re-instated.
     */
    case 'charge.dispute.funds_reinstated':
      // logic here..

      return new Response(
        JSON.stringify({ message: 'Dispute details updated!' }),
        {
          status: 200,
        }
      );
    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Charge Dispute: Funds withdrawn.
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * This is the webhook that is fired when a dispute\'s funds are withdrawn.
     */
    case 'charge.dispute.funds_withdrawn':
      // logic here...

      return new Response(
        JSON.stringify({ message: 'Dispute details updated!' }),
        {
          status: 200,
        }
      );

    /*
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     * Default
     * =~~~~~~~~~~~~~~~~~~~~~~~=
     */
    default:
      return new Response(JSON.stringify({ error: 'Invalid event type' }), {
        status: 400,
      });
  }
}


/**
 * Webhook declaration
 * @param request 
 * @param response 
 * @returns 
 */
export async function POST(request: NextApiRequest, response: NextApiResponse) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET as string;

    if (request.method === 'POST') {
        const sig = request.headers['stripe-signature'];

        let event: Stripe.Event;

        try {
        const body = await buffer(request);
        const signature = sig as string;
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err}`);
        response.status(400).send(`Webhook Error: ${err}`);
        return;
        }

        // Successfully constructed event
        console.log('✅ Success:', event.id);

        // Cast event data to Stripe object
        try {
            await handleStripeWebhook(event);
            response.status(200).json({ received: true });
        } catch (error) {
            console.error('Erreur lors du traitement du webhook:', error);
            response.status(500).json({ error: 'Erreur interne du serveur' });
        }

        // Return a response to acknowledge receipt of the event
        response.json({ received: true });
    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method Not Allowed');
    }
}

const buffer = (req: NextApiRequest) => {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
  
      req.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });
  
      req.on('end', () => {
        //@ts-ignore
        resolve(Buffer.concat(chunks));
      });
  
      req.on('error', reject);
    });
  };
  
