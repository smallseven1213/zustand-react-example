import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * 這裡的USER_NAME會儲存成 JSON 格式
 */
export type UserState = {
  name: string
  setName: (name: string) => void
  clear: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      setName: (name: string) => set({ name }),
      clear: () => set({ name: '' }),
    }),
    {
      name: 'USER_NAME',
      storage: createJSONStorage(() => localStorage),
      // Only persist the "name" field
      partialize: (state) => ({ name: state.name }),
      version: 1,
    },
  ),
)

