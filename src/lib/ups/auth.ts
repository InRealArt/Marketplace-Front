import { UPS_CONFIG } from './config'

interface UPSToken {
    access_token: string
    token_type: string
    expires_in: number
    expires_at: number
}

let cachedToken: UPSToken | null = null

export async function getUPSAccessToken(): Promise<string> {
    // Vérifier si le token en cache est encore valide
    if (cachedToken && Date.now() < cachedToken.expires_at) {
        return cachedToken.access_token
    }

    if (!UPS_CONFIG.CLIENT_ID || !UPS_CONFIG.CLIENT_SECRET) {
        throw new Error('Les identifiants UPS ne sont pas configurés')
    }

    try {
        const credentials = Buffer.from(
            `${UPS_CONFIG.CLIENT_ID}:${UPS_CONFIG.CLIENT_SECRET}`
        ).toString('base64')

        const response = await fetch(`${UPS_CONFIG.API_BASE_URL}/security/v1/oauth/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-merchant-id': UPS_CONFIG.CLIENT_ID || ''
            },
            body: 'grant_type=client_credentials'
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Erreur UPS Auth Response:', errorText)
            throw new Error(`Échec de l'authentification UPS: ${response.status}`)
        }

        const tokenData = await response.json()

        // Cache le token avec une marge de sécurité de 5 minutes
        cachedToken = {
            ...tokenData,
            expires_at: Date.now() + (tokenData.expires_in - 300) * 1000
        }

        // TypeScript assertion: cachedToken n'est plus null après l'assignation
        return cachedToken!.access_token
    } catch (error) {
        console.error('Erreur lors de l\'authentification UPS:', error)
        throw new Error('Impossible de s\'authentifier avec UPS')
    }
} 