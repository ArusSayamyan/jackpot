<template>
  <main-wrapper class="h-screen">
    <template #images>
      <img :src="lion" class="absolute left-0 top-0 w-[35%] opacity-20" />
      <img
        :src="buffalo"
        class="absolute right-0 top-0 w-[35%] scale-x-[-1] opacity-20"
      />
    </template>
    <auth-form mode="register" @submit="registerUser" />
  </main-wrapper>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { register, verify } from '~/api/services/auth'
import lion from '~/assets/images/lion.png'
import buffalo from '~/assets/images/buffalo.png'

interface RegisterData {
  phone: string
  password: string
  confirmPassword: string
}

const router = useRouter()
const toast = useToast()
const accessTokenCookie = useCookie('accessToken')

const verifyUser = async (token: string, code: string) => {
  try {
    const { accessToken } = await verify({ token, code })
    if (accessToken) {
      accessTokenCookie.value = accessToken
      await router.push('/')
    }
  } catch (error) {
    toast.add({
      id: 'verify_error',
      title: 'Error',
      description: error.response?._data?.errMsg || 'Verification failed',
      timeout: 5000
    })
  }
}

const registerUser = async ({
  phone,
  password,
  confirmPassword
}: RegisterData) => {
  try {
    if (password !== confirmPassword) {
      toast.add({
        id: 'password_mismatch',
        title: 'Error',
        description: 'Passwords do not match',
        timeout: 5000
      })
      return
    }

    const { token, code } = await register({ phone, password, confirmPassword })

    if (token && code) {
      await verifyUser(token, code)
    }
  } catch (error) {
    toast.add({
      id: 'register_error',
      title: 'Error',
      description: error.response?._data?.errMsg || 'Registration failed',
      timeout: 5000
    })
  }
}
</script>
