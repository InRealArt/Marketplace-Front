import 'server-only'

import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('La variable d\'environnement STRIPE_SECRET_KEY n\'est pas définie')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 