import { getUser } from "~/api/services/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
        try {
            await getUser(accessToken)
        } catch (error) {
            console.log("Invalid token, redirecting to login...");
            return navigateTo("/login");
        }
    } else if (!accessToken && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    }
})
