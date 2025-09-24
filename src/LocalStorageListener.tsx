import { useEffect } from 'react'
import { useUserStore } from './stores/user'

const KEYS = new Set(['USER_NAME', 'USER_ACCOUNT', 'USER_EMAIL'])

export default function LocalStorageListener() {
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== localStorage) return
      if (e.key === null || KEYS.has(e.key)) {
        useUserStore.persist.rehydrate()
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return null
}

