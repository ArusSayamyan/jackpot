<template>
  <div
      class="flex justify-center items-center w-full p-4 text-center h-[192px] bg-[url('~/assets/images/winBg.svg')] bg-cover bg-center relative"
      :class="gameResult ? 'bg-[url(~/assets/images/winBg.svg)]' : 'bg-[url(~/assets/images/lostBg.svg)]'"
  >
    <img :src="gameResult ? winBtn : lostBtn" class="absolute w-[200px]  left-1/2 transform -translate-x-1/2 -top-4" alt="#">
    <div class="text-white font-bold text-lg absolute z-10 left-1/2 transform -translate-x-1/2 -top-0">
      {{ selectedCoin }}
    </div>
    <div>
      <p class="text-green-200 text-lg mt-2" :class="gameResult ? 'text-[#8BFF79]' : 'text-red-600'">
        {{ gameResult ? 'YOU WON!' : 'YOU LOST!' }}
      </p>
      <p class="text-yellow-400 text-2xl font-bold" v-if="gameResult">1000 TSH</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import winBtn from "assets/images/winBtn.svg";
import lostBtn from "assets/images/lostBtn.svg";

defineProps( {
  gameResult: {
    type: Boolean,
    default: false
  },
  selectedCoin: {
    type: String || null,
    default: null
  }
})
</script>
<style scoped>

</style>