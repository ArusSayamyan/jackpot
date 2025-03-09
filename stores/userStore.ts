import { getUser } from '~/api/services/auth'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const setUserdata = async (token: string) => {
    try {
      user.value = await getUser(token)
    } catch {
      console.error('Invalid token, redirecting to login...')
      return navigateTo('/login')
    }
  }

  return {
    user,
    setUserdata
  }
})
