import { auth } from './auth'

export async function clientSignOut() {
    try {
        const response = await fetch('/api/auth/signout', {
            method: 'POST',
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error('Échec de la déconnexion')
        }

        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
} 