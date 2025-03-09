<template>
  <main-wrapper class="h-screen">
    <template #images>
      <img :src="lion" class="absolute left-0 top-0 w-[35%] opacity-20">
      <img :src="buffalo" class="absolute right-0 top-0 w-[35%] scale-x-[-1] opacity-20">
    </template>
    <auth-form mode="login" @submit="authLogin" />
  </main-wrapper>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCookie } from "#app";
import { login } from "~/api/services/auth";
import lion from '~/assets/images/lion.png'
import buffalo from '~/assets/images/buffalo.png'
const router = useRouter();
const toast = useToast()

const authLogin = async ({ phone, password }) => {
  try {
    const response = await login({ phone, password })
    if (response.accessToken) {
      useCookie("accessToken").value = response.accessToken;
      router.push("/");
    }
  } catch (error) {
    toast.add({
      id: 'login_error',
      title: 'Oooops(',
      description: error.response._data?.errMsg,
      timeout: 0,
    })  }
};
</script>