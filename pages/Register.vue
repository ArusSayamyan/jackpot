<template>
  <main-wrapper class="h-screen">
    <template #images>
      <img :src="lion" class="absolute left-0 top-0 w-[35%] opacity-20">
      <img :src="buffalo" class="absolute right-0 top-0 w-[35%] scale-x-[-1] opacity-20">
    </template>
    <auth-form mode="register" @submit="registerUser" />
  </main-wrapper>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { register, verify } from "~/api/services/auth";
import lion from '~/assets/images/lion.png'
import buffalo from '~/assets/images/buffalo.png'
const router = useRouter();
const toast = useToast()

const registerUser = async ({ phone, password, confirmPassword }) => {
  try {
    if (password !== confirmPassword) {
      return;
    }
    const response = await register({ phone, password, confirmPassword })

    if (response.token && response.code) {
      await verifyUser(response.token, response.code)
    }
  } catch (error) {
    toast.add({
      id: 'register_error',
      title: 'Oooops(',
      description: error.response._data?.errMsg,
      timeout: 0,
    })
  }
};

const verifyUser = async (token, code) => {
  try {
    const response = await verify({ token, code: code })

    if (response.accessToken) {
      useCookie("accessToken").value = response.accessToken;
      router.push("/");
    }
  } catch (error) {
    console.log(error)
  }
};
</script>