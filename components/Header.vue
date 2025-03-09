<template>
  <div class="h-fit flex gap-[30px] items-center">
    <div
      class="max-w-[150px] h-fit w-full flex flex-col text-white text-center border-cyan-800 border-2 rounded-md relative"
    >
      <span>984874982</span>

      <span class="text-trueGray-500">Tzs</span>

      <UButton
        class="absolute -right-4 -bottom-4 w-7 h-7 bg-gradient-to-t from-[#1C6BBF] to-[#01FFFF] flex justify-center items-center text-sm rounded-full"
        icon="i-heroicons-plus"
        size="xl"
      />
    </div>

    <h1 class="text-2xl text-white text-center">Lion or Buffalo</h1>

    <UButton
      variant="link"
      icon="i-heroicons-arrow-uturn-left"
      size="sm"
      label="Log out"
      class="bg-transparent"
      @click="onLogout"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['logout'])

const onLogout = () => {
  emit('logout')
}
</script>
