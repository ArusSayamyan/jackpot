export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
        await userStore.setUserdata(accessToken)
    } else if (!accessToken && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    }
})
