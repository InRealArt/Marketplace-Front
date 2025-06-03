import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const techniques = await prisma.artworkTechnique.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return NextResponse.json(techniques)
    } catch (error) {
        console.error('Erreur lors de la récupération des techniques:', error)
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
    }
} 