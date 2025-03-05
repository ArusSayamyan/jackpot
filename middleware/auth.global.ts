export default defineNuxtRouteMiddleware(async (to, from) => {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
        try {
            await $fetch("https://stagingnew.slotpesa.co.tz/api/v1/user/get", {
                headers: { "Access-Token": accessToken },
            });
        } catch (error) {
            console.log("Invalid token, redirecting to login...");
            return navigateTo("/auth/login");
        }
    } else if (!accessToken && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    }
})
