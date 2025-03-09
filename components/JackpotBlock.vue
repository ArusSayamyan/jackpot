<template>
  <div class="max-w-[244px] h-[51px] bg-[#0E172B] rounded-[12px] w-full  border-2 border-cyan-400 my-0 mx-auto flex justify-center items-end">
    <div class="flex flex-col text-white text-center h-[65px] font-extrabold">
      <span class="text-[18px]">Jackpot</span>
      <span class="text-[18px]">{{ jackpot }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  jackpot: {
    type: String,
    default: ""
  }
})
</script>