import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const styles = await prisma.artworkStyle.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return NextResponse.json(styles)
    } catch (error) {
        console.error('Erreur lors de la récupération des styles:', error)
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
    }
} 