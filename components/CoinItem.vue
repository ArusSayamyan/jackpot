<template>
  <div class="w-12 h-[46px] bg-[#4D778B] border-4 border-[#81AFC9] rounded-xl">
    <img :src="coinImage" :alt="coinImage" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  coinImage: string
}>()
</script>
