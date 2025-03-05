<template>
  <main-wrapper>
    <auth-form mode="register" :errorMessage="errorMessage" @submit="register" />
  </main-wrapper>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MainWrapper from "~/components/mainWrapper/MainWrapper.vue";
import AuthForm from "~/components/form/AuthForm.vue";

const router = useRouter();
const errorMessage = ref("");

const register = async ({ phone, password, confirmPassword }) => {
  try {
    if (password !== confirmPassword) {
      errorMessage.value = "Passwords do not match!";
      return;
    }

    const response = await $fetch("https://stagingnew.slotpesa.co.tz/api/v1/auth/register", {
      method: "POST",
      body: { phone, password, confirmPassword },
    });

    if (response.token && response.code) {
      await verify(response.token, response.code)
    }
  } catch (error) {
    errorMessage.value = "Registration failed!";
  }
};

const verify = async (token, code) => {
  try {
    const response = await $fetch("https://stagingnew.slotpesa.co.tz/api/v1/auth/verifyRegistration", {
      method: "POST",
      body: { token, code: code },
    });

    if (response.accessToken) {
      useCookie("accessToken").value = response.accessToken;
      router.push("/");
    }
  } catch (error) {
    errorMessage.value = "Verification failed!";
  }
};
</script>