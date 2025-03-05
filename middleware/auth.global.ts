export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie('user')

    if (!user.value && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    }
})
