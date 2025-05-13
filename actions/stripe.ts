'use server'

import { stripe } from '../lib/stripe'
import { redirect } from 'next/navigation'

/**
 * Crée une session de paiement Stripe Checkout
 */
export async function createCheckoutSession(items: { priceId: string, quantity: number }[]) {
    try {
        // Vérification des variables d'environnement
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('La clé secrète Stripe n\'est pas configurée')
        }

        const origin = process.env.NEXT_PUBLIC_APP_URL ||
            process.env.NEXT_PUBLIC_VERCEL_URL ||
            'http://localhost:3000'

        // Créer une session Checkout
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: items.map(item => ({
                price: item.priceId,
                quantity: item.quantity
            })),
            mode: 'payment',
            return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
        })

        // Retourner le client_secret pour le frontend
        return {
            clientSecret: session.client_secret,
            sessionId: session.id
        }
    } catch (error) {
        console.error('Erreur lors de la création de la session de paiement:', error)
        throw new Error('Impossible de créer la session de paiement')
    }
} 