import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const mediums = await prisma.artworkMedium.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return NextResponse.json(mediums)
    } catch (error) {
        console.error('Erreur lors de la récupération des mediums:', error)
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
    }
} 