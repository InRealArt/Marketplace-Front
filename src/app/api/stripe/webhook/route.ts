// See https://github.com/stripe/stripe-node/blob/master/examples/webhook-signing/nextjs/pages/api/webhooks.ts
import { stripe } from '@/lib/stripe/config';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

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

    case 'checkout.session.completed': {
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
    }
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
 */
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id);

    const permittedEvents: string[] = [
      'checkout.session.completed',
      'payment_intent.succeeded',
      'payment_intent.payment_failed',
    ];

    if (permittedEvents.includes(event.type)) {
      let data;

      try {
        switch (event.type) {
          case 'checkout.session.completed':
            data = event.data.object as Stripe.Checkout.Session;
            console.log(`💰 CheckoutSession status: ${data.payment_status}`);
            break;
          case 'payment_intent.payment_failed':
            data = event.data.object as Stripe.PaymentIntent;
            console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
            break;
          case 'payment_intent.succeeded':
            data = event.data.object as Stripe.PaymentIntent;
            console.log(`💰 PaymentIntent status: ${data.status}`);
            break;
          default:
            throw new Error(`Unhandled relevant event!`);
        }
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
      }
    }
    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}

