<template>
  <div class="h-full w-full bg-white my-0 mx-auto">
    <main-wrapper class="w-full h-full">
      <div class="h-full flex flex-col gap-10 max-w-[520px] w-full py-5">

        <!--        HEADER-->
        <Header @logout="logout"/>

        <!--        JACKPOT BUTTON-->
        <JackpotBlock :jackpot="'984874982'"/>

        <!--        COIN BLOCK-->
        <div class="flex justify-between ">
          <div class="flex flex-col gap-[25px] h-fit">
            <CoinItem :coin-image="lion"/>
            <CoinItem :coin-image="buffalo"/>
            <CoinItem :coin-image="lion"/>
            <CoinItem :coin-image="buffalo"/>
            <CoinItem :coin-image="lion"/>
          </div>
          <div class="w-[330px] h-[330px] relative" :class="{ animate: isSpinning }">
            <img :src="lion" alt="lion" class="w-full h-full heads face" :style="{transform: headsStyle}">
            <img :src="buffalo" alt="buffalo" class="w-full h-full tails face" :style="{transform: tailsStyle}">
          </div>
          <div>
            <img :src="steps" alt="steps" class="h-[330px]">
          </div>
        </div>

        <!--        BUTTONS BLOCK-->
        <div v-if="selectedCoin && !time">
          <GameResult :gameResult="gameResult" :selectedCoin="selectedCoin"/>
        </div>

        <!--        TIME BLOCK-->
        <div v-else class="flex flex-col">
          <div class="mx-auto max-w-[300px] w-full mt-0 mb-8">
            <p v-if="!!timeLeft" class="text-white text-[27px] text-center">Game starts in {{ formattedTime }}</p>
            <UProgress animation="carousel" :value="time" :max="5" color="blue" class="mt-3 w-full"/>
          </div>
          <div class="w-full gap-[10px] flex mx-auto justify-between mt-0 mb-3">
            <UButton :disabled="!time" @click="setSelectedCoin('buffalo')" size="xl" color="cyan"
                     class="w-[255px] flex flex-col ">
              <span class="uppercase">Buffalo</span>
              <span class="text-black">Bet x2</span>
            </UButton>
            <UButton :disabled="!time" @click="setSelectedCoin('lion')" size="xl" color="yellow"
                     class="w-[255px] flex flex-col">
              <span class="uppercase">Lion</span>
              <span class="text-black">Bet x2</span>
            </UButton>
          </div>

          <!--          CONTROL BLOCK-->
          <div class="w-auto gap-0.5 flex mx-auto my-0">
            <UButtonGroup size="lg" class="flex gap-1" orientation="horizontal">
              <UButton @click="updateBet('min')" class="bg-[#4D6C8B] rounded-lg flex flex-col w-[90px]">
                <span>100</span><span>min</span></UButton>
              <div class="flex">
                <UButton @click="updateBet('dec')" icon="i-heroicons-minus"
                         class="bg-[#4D6C8B] rounded-bl-lg rounded-tl-lg w-[50px] justify-center"/>
                <div class="px-5 flex justify-center items-center text-white bg-[#25354D] w-[234px]">
                  <span>Bet {{ betValue }}</span>
                </div>
                <UButton @click="updateBet('inc')" icon="i-heroicons-plus"
                         class="bg-[#4D6C8B] rounded-br-lg rounded-tr-lg w-[50px] justify-center"/>
              </div>
              <UButton @click="updateBet('max')" class="bg-[#4D6C8B] w-[90px] rounded-lg flex flex-col">
                <span>10k</span><span>max</span></UButton>
            </UButtonGroup>
          </div>
        </div>


        <!--        HISTORY TABLE-->
        <HistoryTable :bet-history="betHistory" :items="items"/>
      </div>
    </main-wrapper>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import lion from '~/assets/images/lion.png'
import buffalo from '~/assets/images/buffalo.png'
import steps from '~/assets/images/steps.png'

const router = useRouter();
const cookie = useCookie('accessToken')

const time = ref(5)
const betValue = ref(100)
const betHistory = ref([]);
const timeLeft = ref(3);
const formattedTime = ref(`00:${timeLeft.value < 10 ? '0' : ''}${timeLeft.value}`);
const selectedCoin = ref(null)
const isHeadsSelected = ref(Math.random() < 0.5);
const isSpinning = ref(false);


const items = [{
  label: 'Live bets',
}, {
  label: 'History',
}, {
  label: 'Top 10',
}]


const startCountdown = () => {
  const timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
      formattedTime.value = `00:${timeLeft.value < 10 ? '0' : ''}${timeLeft.value}`;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

const updateBet = (action) => {
  if (action === 'min') {
    betValue.value = 100;
  } else if (action === 'max') {
    betValue.value = 10000;
  } else if (action === 'dec' && betValue.value > 100) {
    betValue.value = Math.max(100, betValue.value - 100);
  } else if (action === 'inc' && betValue.value < 10000) {
    betValue.value = Math.min(10000, betValue.value + 100);
  }
}

const setSelectedCoin = (value) => {
  selectedCoin.value = value
}

const gameResult = computed(() => {
  return isHeadsSelected.value && selectedCoin.value === 'lion' || !isHeadsSelected.value && selectedCoin.value === 'buffalo'
})

const headsStyle = computed(() => {
  return  isHeadsSelected.value ? 'rotateY(0deg)' : 'rotateY(180deg)'
});

const tailsStyle = computed(() => {
  return isHeadsSelected.value ? 'rotateY(180deg)' : 'rotateY(0deg)'
});

const spinCoin = () => {
  isSpinning.value = true;
  time.value = 5;
  const interval = setInterval(() => {
    if (time.value > 0) {
      time.value -= 1;
    } else {
      clearInterval(interval);
      if (selectedCoin.value) {
        betHistory.value.push({
          id: Date.now(),
          date: new Date().toLocaleString(),
          stake: '0.2',
          status: gameResult.value ? '0.2' : "LOST",
          pick: selectedCoin.value.toUpperCase(),
        })
      }
      selectedCoin.value = null
      betValue.value = 100
    }
  }, 1000);
  setTimeout(() => {
    isSpinning.value = false;
    isHeadsSelected.value = Math.random() < 0.5;
    setTimeout(spinCoin, 3000); // Restart spin
  }, 5000);
}

const logout = () => {
  cookie.value = null;
  router.push('/login');
}

watch(timeLeft, (newValue) => {
  if (newValue === 0) {
    spinCoin();
  }
});


onMounted(() => {
  startCountdown()
});

</script>
<style scoped>
@keyframes rotation {
  0% {
    transform: rotate3d(0, 1, 0, 0deg);
  }
  50% {
    transform: rotate3d(0, 1, 0, 180deg);
  }
  100% {
    transform: rotate3d(0, 1, 0, 360deg);
  }
}

.animate {
  animation-name: rotation;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 1s;
  transform: rotateY(0deg);
  transform-style: preserve-3d;
}


.face {
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}

.heads {
  transform: rotateY(0deg);
}

.tails {
  transform: rotateY(180deg);
}

</style>