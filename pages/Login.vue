<template>
  <main-wrapper>
    <auth-form mode="login" :errorMessage="errorMessage" @submit="authLogin" />
  </main-wrapper>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";
import MainWrapper from "~/components/mainWrapper/MainWrapper.vue";
import AuthForm from "~/components/form/AuthForm.vue";
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