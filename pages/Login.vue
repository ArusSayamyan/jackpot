<template>
  <main-wrapper>
    <template #images>
      <img src="~/assets/images/lion.png" class="absolute left-0 top-0 w-[35%] opacity-20">
      <img src="~/assets/images/buffalo.png" class="absolute right-0 top-0 w-[35%] scale-x-[-1] opacity-20">
    </template>
    <auth-form mode="login" :errorMessage="errorMessage" @submit="authLogin" />
  </main-wrapper>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";
import { login } from "~/api/services/auth.ts";

const router = useRouter();
const errorMessage = ref("");

const authLogin = async ({ phone, password }) => {
  try {
    const response = await login({ phone, password })
    if (response.accessToken) {
      useCookie("accessToken").value = response.accessToken;
      router.push("/");
    }
  } catch (error) {
    errorMessage.value = "Invalid credentials!";
  }
};
</script>