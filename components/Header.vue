<template>
  <div class="h-fit flex gap-[30px] items-center">
    <div class="max-w-[150px] h-fit w-full flex flex-col text-white text-center border-cyan-800 border-2 rounded-md relative">
      <span>984874982</span>
      <span class="text-trueGray-500">Tzs</span>
      <UButton
          class="absolute w-[28px] h-[28px] bg-gradient-to-t from-[#1C6BBF] to-[#01FFFF] opacity-100 flex justify-center items-center text-sm -right-4 -bottom-4"
          icon="i-heroicons-plus"
          size="xl"
          :ui="{ rounded: 'rounded-full' }"
      />
    </div>
    <h1 class="text-[24px] text-white text-center h-fit">Name of the game</h1>
    <UButton
        variant="link"
        icon="i-heroicons-arrow-uturn-left"
        size="sm"
        label="Log out"
        class="bg-unset"
        @click="logout"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['logout'])
const logout = () => {
  emits('logout')
}
</script>
