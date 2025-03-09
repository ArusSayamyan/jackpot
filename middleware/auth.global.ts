export default defineNuxtRouteMiddleware(async (to) => {
  const accessToken = useCookie('accessToken').value
  const publicRoutes = ['/login', '/register']

  if (accessToken) {
    const userStore = useUserStore()
    await userStore.setUserdata(accessToken)
  } else if (!publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
})
