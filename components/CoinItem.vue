<template>
  <div class="w-[48px] h-[46px] bg-[#4D778B] border-4 border-[#81AFC9] rounded-[12px]">
    <img :src="coinImage" alt="coinImage" class="w-full h-full">
  </div>
</template>
<script setup lang="ts">
defineProps({
  coinImage: {
    type: String,
    default: ""
  }
})
</script>