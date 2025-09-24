import { create } from 'zustand'
import { persist, type StorageValue, type PersistStorage } from 'zustand/middleware'

export type UserState = {
  name: string
  account: string
  email: string
  setName: (name: string) => void
  setAccount: (account: string) => void
  setEmail: (email: string) => void
  clear: () => void
}

// Persisted storage schema for user's basic info in localStorage via Zustand.
// Store each field as a plain string in its own key.
type PersistedUser = { name: string; account: string; email: string }
const KEYS = {
  name: 'USER_NAME',
  account: 'USER_ACCOUNT',
  email: 'USER_EMAIL',
} as const

const plainStringStorage: PersistStorage<PersistedUser> = {
  getItem: (_name): StorageValue<PersistedUser> | null => {
    // name (with migration from old JSON-wrapped format)
    const rawName = localStorage.getItem(KEYS.name)
    let name = rawName ?? ''
    try {
      if (rawName) {
        const obj = JSON.parse(rawName)
        if (obj && typeof obj === 'object' && 'state' in obj) {
          name = (obj as any)?.state?.name ?? ''
          localStorage.setItem(KEYS.name, name)
        }
      }
    } catch {
      // already a plain string
    }
    // account & email (plain string)
    const account = localStorage.getItem(KEYS.account) ?? ''
    const email = localStorage.getItem(KEYS.email) ?? ''
    return { state: { name, account, email }, version: 1 }
  },
  setItem: (_key, value: StorageValue<PersistedUser>) => {
    const st = value?.state ?? { name: '', account: '', email: '' }
    localStorage.setItem(KEYS.name, st.name ?? '')
    localStorage.setItem(KEYS.account, st.account ?? '')
    localStorage.setItem(KEYS.email, st.email ?? '')
  },
  removeItem: (_key) => {
    localStorage.removeItem(KEYS.name)
    localStorage.removeItem(KEYS.account)
    localStorage.removeItem(KEYS.email)
  },
}

export const useUserStore = create<UserState>()(
  persist<UserState, [], [], PersistedUser>(
    (set) => ({
      name: '',
      account: '',
      email: '',
      setName: (name: string) => set({ name }),
      setAccount: (account: string) => set({ account }),
      setEmail: (email: string) => set({ email }),
      clear: () => set({ name: '', account: '', email: '' }),
    }),
    {
      name: 'USER_NAME',
      storage: plainStringStorage,
      version: 1,
    },
  ),
)
