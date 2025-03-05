<template>
  <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded shadow-md w-96">
    <h2 class="text-xl font-semibold text-center mb-4">
      {{ mode === "register" ? "Register" : "Login" }}
    </h2>

    <input v-model="phone" type="text" placeholder="Phone (255XXXXXXXXX)" class="w-full p-2 mb-2 border border-gray-300 rounded-md" />
    <input v-model="password" type="password" placeholder="Password" class="w-full p-2 mb-2 border border-gray-300 rounded-md" />

    <input
        v-if="mode === 'register'"
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        class="w-full p-2 mb-2 border border-gray-300 rounded-md"
    />

    <button class="w-full p-3 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition">
      {{ mode === "register" ? "Register" : "Login" }}
    </button>

    <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>

    <p class="text-sm text-center mt-4">
      <span v-if="mode === 'register'">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-500">Login</NuxtLink>
      </span>
      <span v-else>
        Don't have an account?
        <NuxtLink to="/register" class="text-blue-500">Register</NuxtLink>
      </span>
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  mode: String,
  errorMessage: String,
});

const emit = defineEmits(["submit"]);

const phone = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleSubmit = () => {
  const data = { phone: phone.value, password: password.value }
  if(props.mode === "login") {
    emit("submit", data);
  } else {
    emit("submit", {...data, confirmPassword: confirmPassword.value});
  }
};
</script>
