<template>
  <Form @submit="handleSubmit" :validation-schema="schema" class="bg-white p-6 rounded shadow-md max-w-96 w-full ">
    <h2 class="text-xl font-semibold text-center mb-4">
      {{ mode === "register" ? "Register" : "Login" }}
    </h2>

    <div class="relative pb-4">
      <Field v-model="phone" type="text" autocomplete="off" placeholder="Phone (255XXXXXXXXX)" class="w-full p-2 mb-2 border border-gray-300 rounded-md outline-none" name="phone" />
      <ErrorMessage name="phone" class="text-red-700 text-sm absolute left-0 bottom-1"/>
    </div>
    <div class="relative pb-4">
      <Field v-model="password" name="password" autocomplete="off" type="password" placeholder="Password" class="w-full p-2 mb-2 border border-gray-300 rounded-md outline-none" />
      <ErrorMessage name="password" class="text-red-700 text-sm absolute left-0 bottom-1"/>
    </div>

    <div v-if="mode === 'register'" class="relative pb-4">
      <Field
          v-model="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          class="w-full p-2 mb-2 border border-gray-300 rounded-md outline-none"
          autocomplete="off"
      />
      <ErrorMessage name="confirmPassword" class="text-red-700 text-sm absolute left-0 bottom-0"/>
    </div>

    <button class="w-full p-3 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition">
      {{ mode === "register" ? "Register" : "Login" }}
    </button>
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
  </Form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as yup from "yup";
import { Field, Form, ErrorMessage } from 'vee-validate';
import type { AuthData } from "~/api/types";

const phone = ref("");
const password = ref("");
const confirmPassword = ref("");

const props = defineProps({
  mode: String,
});
const emit = defineEmits(["submit"]);

const schema = yup.object({
  phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^255\d{9}$/, "Phone number must be in the format 255XXXXXXXXX"),

  password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .when(props.mode, {
        is: "register",
        then: (schema) => schema.required("Confirm password is required"),
      }),
});

const handleSubmit = (values:AuthData) => {
    emit("submit", values);
};
</script>
