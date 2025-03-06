<template>
  <main-wrapper>
    <auth-form mode="register" :errorMessage="errorMessage" @submit="registerUser" />
  </main-wrapper>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MainWrapper from "~/components/mainWrapper/MainWrapper.vue";
import AuthForm from "~/components/form/AuthForm.vue";
import { register, verify } from "~/api/services/auth.js";

const router = useRouter();
const errorMessage = ref("");

const registerUser = async ({ phone, password, confirmPassword }) => {
  try {
    if (password !== confirmPassword) {
      errorMessage.value = "Passwords do not match!";
      return;
    }
    const response = await register({ phone, password, confirmPassword })

    if (response.token && response.code) {
      await verifyUser(response.token, response.code)
    }
  } catch (error) {
    errorMessage.value = "Registration failed!";
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
    errorMessage.value = "Verification failed!";
  }
};
</script>