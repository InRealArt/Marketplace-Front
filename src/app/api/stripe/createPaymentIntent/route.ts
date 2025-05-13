import { stripe } from '@/lib/stripe/config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { amount, currency = 'eur', metadata = {} } = body

        // Validation du montant
        if (!Number.isInteger(amount) || amount <= 0 || amount > 999999999) {
            return NextResponse.json(
                { error: 'Montant invalide' },
                { status: 400 }
            )
        }

        // Création de l'intention de paiement
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata,
            // Autoriser uniquement les paiements par carte
            payment_method_types: ['card'],
            // Ne pas activer automatiquement toutes les méthodes de paiement
            automatic_payment_methods: {
                enabled: false,
            },
        })

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        console.error('Erreur Stripe:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la création de l\'intention de paiement' },
            { status: 500 }
        )
    }
} 