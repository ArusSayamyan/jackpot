<template>
  <div
    class="relative border-cyan-400 border-2 max-w-[244px] bg-[#0E172B] py-3 rounded-xl w-full mx-auto flex justify-center z-1"
  >
    <p
      class="text-lg absolute -top-4 left-1/2 transform -translate-x-1/2 px-2 text-white"
    >
      Jackpot
    </p>

    <span class="text-lg text-white">{{ jackpot }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  jackpot?: string
}>()
</script>
