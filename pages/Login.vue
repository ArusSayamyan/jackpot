<template>
  <main-wrapper class="h-screen">
    <template #images>
      <img :src="lion" class="absolute left-0 top-0 w-[35%] opacity-20" />

      <img
        :src="buffalo"
        class="absolute right-0 top-0 w-[35%] scale-x-[-1] opacity-20"
      />
    </template>

    <auth-form mode="login" @submit="handleLogin" />
  </main-wrapper>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
import { login } from '~/api/services/auth'
import lion from '~/assets/images/lion.png'
import buffalo from '~/assets/images/buffalo.png'

const router = useRouter()
const toast = useToast()
const accessTokenCookie = useCookie('accessToken')

const handleLogin = async ({
  phone,
  password
}: {
  phone: string
  password: string
}) => {
  try {
    const { accessToken } = await login({ phone, password })
    if (accessToken) {
      accessTokenCookie.value = accessToken
      await router.push('/')
    }
  } catch (error: any) {
    toast.add({
      id: 'login_error',
      title: 'Error',
      description: error.response?._data?.errMsg || 'Login failed',
      timeout: 5000
    })
  }
}
</script>
