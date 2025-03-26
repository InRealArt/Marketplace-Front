'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function signOut() {
    try {
        await auth.api.signOut({
            headers: headers()
        })
        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
} 