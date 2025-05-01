import { create } from 'zustand'
import { fetchBackofficeUsers, fetchBackofficeUserByArtistId } from '@/lib/backofficeUsers'

interface BackofficeUser {
  id: number
  email?: string | null
  walletAddress: string
  lastName?: string | null
  firstName?: string | null
  artistId?: number | null
}

interface BackofficeUserState {
  users: BackofficeUser[]
  isLoading: boolean
  error: Error | null
  fetchUsers: () => Promise<void>
  getUserByArtistId: (artistId: number) => BackofficeUser | undefined
}

export const useBackofficeUserStore = create<BackofficeUserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  
  fetchUsers: async () => {
    // Don't fetch if we already have users
    if (get().users.length > 0) return
    
    try {
      set({ isLoading: true, error: null })
      const users = await fetchBackofficeUsers()
      set({ users, isLoading: false })
    } catch (error) {
      set({ isLoading: false, error: error as Error })
    }
  },
  
  getUserByArtistId: (artistId: number) => {
    return get().users.find(user => user.artistId === artistId)
  }
})) 