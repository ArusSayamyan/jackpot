<template>
  <main-wrapper>
    <auth-form mode="login" :errorMessage="errorMessage" @submit="login" />
  </main-wrapper>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";
import MainWrapper from "~/components/mainWrapper/MainWrapper.vue";
import AuthForm from "~/components/form/AuthForm.vue";

const router = useRouter();
const errorMessage = ref("");

const login = async ({ phone, password }) => {
  try {
    const response = await $fetch("https://stagingnew.slotpesa.co.tz/api/v1/auth/login", {
      method: "POST",
      body:  { phone, password },
    });

    if (response.accessToken) {
      useCookie("accessToken").value = response.accessToken;
      router.push("/");
    }
  } catch (error) {
    errorMessage.value = "Invalid credentials!";
  }
};
</script>