<template>
  <div class="h-full w-full bg-white mx-auto">
    <main-wrapper class="w-full h-full">
      <div class="h-full flex flex-col gap-10 max-w-[520px] w-full py-5">
        <Header @logout="logout"/>

        <JackpotBlock :jackpot="'984874982'"/>

        <div class="flex justify-between">
          <div class="flex flex-col gap-[25px]">
            <template v-for="(coin, index) in coinSequence" :key="index">
              <CoinItem :coin-image="coin"/>
            </template>
          </div>
          <div
              class="w-[330px] h-[330px] relative"
              :class="{ animate: isSpinning }"
          >
            <img
                :src="lion"
                alt="lion"
                class="w-full h-full buffalo face"
                :style="{ transform: headsStyle }"
            />
            <img
                :src="buffalo"
                alt="buffalo"
                class="w-full h-full lion face"
                :style="{ transform: tailsStyle }"
            />
          </div>
          <div>
            <img :src="steps" alt="steps" class="h-[330px]"/>
          </div>
        </div>

        <GameResult
            v-if="selectedCoin && !time"
            :gameResult="gameResult"
            :selectedCoin="selectedCoin"
        />

        <div v-else class="flex flex-col">
          <div class="mx-auto max-w-[300px] w-full mb-8">
            <p v-if="timeLeft" class="text-white text-[27px] text-center">
              Game starts in {{ formattedTime }}
            </p>

            <UProgress :value="time" :max="5" color="blue" class="mt-3"/>
          </div>
          <div class="w-full gap-2.5 flex mx-auto justify-between mt-0 mb-3">
            <UButton
                :disabled="!time"
                @click="setSelectedCoin('buffalo')"
                size="xl"
                active-class="!bg-red-500"
                class="w-[255px] block focus:ring focus:!ring-cyan-500/50 bg-gradient-to-tr from-[#1C6BBF] to-[#26D4FF]"
            >
              <p class="uppercase text-white">Buffalo</p>

              <p class="font-bold text-black">Bet x2</p>
            </UButton>

            <UButton
                :disabled="!time"
                @click="setSelectedCoin('lion')"
                size="xl"
                class="w-[255px] block focus:ring focus:!ring-yellow-500/50 bg-gradient-to-tr from-[#F57100] to-[#FFD526]"
            >
              <p class="uppercase text-white">Lion</p>

              <p class="font-bold text-black">Bet x2</p>
            </UButton>
          </div>

          <div class="flex mx-auto">
            <UButtonGroup
                size="lg"
                class="flex gap-1"
                orientation="horizontal"
                :class="{ 'mb-3': timeLeft }"
            >
              <UButton
                  @click="updateBet('min')"
                  class="rounded-lg flex flex-col w-[90px] bg-gradient-to-tr from-[#274B69] to-[#4D6C8B]"
              >
                <span>{{ MIN_BET }}</span>
                <span>min</span>
              </UButton>
              <div class="flex rounded-lg">
                <UButton
                    @click="updateBet('dec')"
                    icon="i-heroicons-minus"
                    class="rounded-bl-lg rounded-tl-lg w-[50px] justify-center bg-gradient-to-tr from-[#274B69] to-[#4D6C8B]"
                />
                <div
                    class="px-5 flex justify-center items-center text-white bg-[#25354D] w-[234px]"
                >
                  <span>Bet {{ betValue }}</span>
                </div>
                <UButton
                    @click="updateBet('inc')"
                    icon="i-heroicons-plus"
                    class="rounded-br-lg rounded-tr-lg w-[50px] justify-center bg-gradient-to-tr from-[#274B69] to-[#4D6C8B]"
                />
              </div>
              <UButton
                  @click="updateBet('max')"
                  class="w-[90px] rounded-lg flex flex-col bg-gradient-to-tr from-[#274B69] to-[#4D6C8B]"
              >
                <span>{{ MAX_BET / 1000 }}k</span>
                <span>max</span>
              </UButton>
            </UButtonGroup>
          </div>
        </div>

        <HistoryTable :bet-history="betHistory" :items="items"/>
      </div>
    </main-wrapper>
  </div>
</template>

<script setup lang="ts">
import {
  MIN_BET,
  MAX_BET,
  SPIN_DURATION,
  RESTART_DELAY,
  COUNTDOWN_INTERVAL,
  INITIAL_TIME,
  INITIAL_COUNTDOWN
} from '~/constants/constants'
import { useRouter } from 'vue-router'
import lion from '~/assets/images/lion.png'
import steps from '~/assets/images/steps.png'
import buffalo from '~/assets/images/buffalo.png'

const router = useRouter()
const cookie = useCookie('accessToken')

const time = ref(INITIAL_TIME)
const betValue = ref(MIN_BET)
const betHistory = ref([])
const timeLeft = ref(INITIAL_COUNTDOWN)
const selectedCoin = ref(null)
const isHeadsSelected = ref(Math.random() < 0.5)
const isSpinning = ref(false)

const formattedTime = computed(
    () => `00:${timeLeft.value < 10 ? '0' : ''}${timeLeft.value}`
)

const coinSequence = [lion, buffalo, lion, buffalo, lion]

const items = [
  {label: 'Live bets'},
  {label: 'History'},
  {label: 'Top 10'}
]

const startCountdown = () => {
  const timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
    }
  }, COUNTDOWN_INTERVAL)
}

const updateBet = (action: string) => {
  const actions = {
    min: () => MIN_BET,
    max: () => MAX_BET,
    dec: () => Math.max(MIN_BET, betValue.value - 100),
    inc: () => Math.min(MAX_BET, betValue.value + 100)
  }

  if (action in actions) {
    betValue.value = actions[action]()
  }
}

const setSelectedCoin = (value: string) => {
  selectedCoin.value = value
}

const gameResult = computed(
    () =>
        (isHeadsSelected.value && selectedCoin.value === 'lion') ||
        (!isHeadsSelected.value && selectedCoin.value === 'buffalo')
)

const headsStyle = computed(
    () => `rotateY(${isHeadsSelected.value ? 0 : 180}deg)`
)

const tailsStyle = computed(
    () => `rotateY(${isHeadsSelected.value ? 180 : 0}deg)`
)

const spinCoin = () => {
  isSpinning.value = true
  time.value = INITIAL_TIME

  const interval = setInterval(() => {
    if (time.value > 0) {
      time.value -= 1
    } else {
      clearInterval(interval)
      if (selectedCoin.value) {
        betHistory.value.push({
          id: Date.now(),
          date: new Date().toLocaleString(),
          stake: '0.2',
          status: gameResult.value ? '0.2' : 'LOST',
          pick: selectedCoin.value.toUpperCase()
        })
      }
      selectedCoin.value = null
      betValue.value = MIN_BET
    }
  }, COUNTDOWN_INTERVAL)

  setTimeout(() => {
    isSpinning.value = false
    isHeadsSelected.value = Math.random() < 0.5
    setTimeout(spinCoin, RESTART_DELAY)
  }, SPIN_DURATION)
}

const logout = () => {
  cookie.value = null
  router.push('/login')
}

watch(timeLeft, (newValue) => {
  if (newValue === 0) {
    spinCoin()
  }
})

onMounted(startCountdown)
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
  animation: rotation 0.5s linear infinite;
  transform: rotateY(0deg);
  transform-style: preserve-3d;
}

.face {
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}

.lion {
  transform: rotateY(0deg);
}

.buffalo {
  transform: rotateY(180deg);
}
</style>
