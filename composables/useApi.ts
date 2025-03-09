export const useApi = async <T>(
  endpoint: string,
  options: any = {}
): Promise<T> => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.API_BASE_URL
  return await $fetch<T>(`${baseUrl}/${endpoint}`, {
    ...options
  })
}
