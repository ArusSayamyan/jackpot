import { getUser } from "~/api/services/auth";

export const useUserStore = defineStore('user', () => {
    const user = ref({})
    async function setUserdata(token: string) {
        try {
            user.value = await getUser(token)
        } catch (error) {
            console.log("Invalid token, redirecting to login...");
            return navigateTo("/login");
        }
    }

    return { user, setUserdata }
})