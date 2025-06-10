import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        return NextResponse.json({ session })
    } catch (error) {
        return NextResponse.json(
            { error: 'Erreur lors de la récupération de la session' },
            { status: 500 }
        )
    }
} 