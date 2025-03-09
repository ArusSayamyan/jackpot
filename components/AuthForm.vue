<template>
  <Form
    @submit="handleSubmit"
    :validation-schema="schema"
    class="bg-white p-6 rounded shadow-md max-w-96 w-full"
  >
    <h2 class="text-xl font-semibold text-center mb-4">
      {{ mode === 'register' ? 'Register' : 'Login' }}
    </h2>

    <div v-for="field in fields" :key="field.name" class="relative pb-4">
      <Field
        v-model="formData[field.name]"
        v-bind="field.attrs"
        :name="field.name"
        class="w-full p-2 mb-2 border border-gray-300 rounded-md outline-none"
      />

      <ErrorMessage
        :name="field.name"
        class="text-red-700 text-sm absolute left-0"
        :class="field.name === 'confirmPassword' ? 'bottom-0' : 'bottom-1'"
      />
    </div>

    <button
      class="w-full p-3 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition"
    >
      {{ mode === 'register' ? 'Register' : 'Login' }}
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
import { ref, computed } from 'vue'
import * as yup from 'yup'
import { Field, Form, ErrorMessage } from 'vee-validate'
import type { AuthData } from '~/api/types'

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value: string) => ['login', 'register'].includes(value)
  }
})

const emit = defineEmits(['submit'])

const formData = ref({
  phone: '',
  password: '',
  confirmPassword: ''
})

const fields = computed(() => {
  const baseFields = [
    {
      name: 'phone',
      attrs: {
        type: 'text',
        autocomplete: 'off',
        placeholder: 'Phone (255XXXXXXXXX)'
      }
    },
    {
      name: 'password',
      attrs: {
        type: 'password',
        autocomplete: 'off',
        placeholder: 'Password'
      }
    }
  ]

  if (props.mode === 'register') {
    baseFields.push({
      name: 'confirmPassword',
      attrs: {
        type: 'password',
        autocomplete: 'off',
        placeholder: 'Confirm Password'
      }
    })
  }

  return baseFields
})

const schema = yup.object({
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^255\d{9}$/, 'Phone number must be in the format 255XXXXXXXXX'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .when(props.mode, {
      is: 'register',
      then: (schema) => schema.required('Confirm password is required')
    })
})

const handleSubmit = (values: AuthData) => {
  emit('submit', values)
}
</script>
