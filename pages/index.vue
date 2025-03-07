<template>
  <div class="h-full w-full bg-white my-0 mx-auto">
    <main-wrapper class="w-full">
      <div class="h-full flex flex-col gap-10 max-w-[700px] w-full p-5">

<!--        HEADER-->
       <div class="w-[70%] h-fit flex justify-between">
         <div class="max-w-[150px] h-fit w-full flex flex-col text-white text-center border-2 rounded-md relative">
           <span>984874982</span>
           <span>Tzs</span>
           <div class="absolute rounded-3xl bg-cyan-400 w-8 h-8 flex justify-center items-center text-2xl -right-4 -bottom-4"><span>+</span></div>
         </div>
         <h1 class="text-2xl text-white text-center h-fit">Name of the game</h1>
       </div>


<!--        JACKPOT BUTTON-->
        <div class="max-w-[150px] h-10 w-full  border-2 border-cyan-400 rounded-md my-0 mx-auto flex justify-center items-end">
          <div class="flex flex-col text-white text-center h-14 font-extrabold">
            <span>Jackpot</span>
            <span>984874982</span>
          </div>
        </div>

<!--        COIN BLOCK-->
        <div class="flex justify-between ">
          <div class="flex flex-col gap-10 h-fit">
            <div class="w-8 h-8 p-0.5 rounded bg-white/50 border-2 border-white">
              <img src="~/assets/images/lion.png" class="w-full h-full">
            </div>
            <div class="w-8 h-8 p-0.5 rounded bg-white/50 border-2 border-white">
              <img src="~/assets/images/buffalo.png" class="w-full h-full">
            </div>
            <div class="w-8 h-8 p-0.5 rounded bg-white/50 border-2 border-white">
              <img src="~/assets/images/lion.png" class="w-full h-full">
            </div>
            <div class="w-8 h-8 p-0.5 rounded bg-white/50 border-2 border-white">
              <img src="~/assets/images/buffalo.png" class="w-full h-full">
            </div>
            <div class="w-8 h-8 p-0.5 rounded bg-white/50 border-2 border-white">
              <img src="~/assets/images/lion.png" class="w-full h-full">
            </div>
          </div>
          <div class="w-full h-full max-w-[320px] max-h-[320px]">
            <img src="~/assets/images/lion.png" class="w-full h-full">
          </div>
          <div class="h-full w-[100px] bg-amber-400">

          </div>
        </div>

<!--        TIME BLOCK-->
          <div class="w-fit mx-auto my-0">
            <p class="text-white">Game starts in 00:00</p>
            <UProgress :value="2" :max="5" class="mt-3"/>
          </div>

<!--        BUTTONS BLOCK-->
        <div class="w-auto gap-2 flex mx-auto my-0">
          <UButton size="xl" color="cyan" class="w-[160px] flex flex-col">
            <span class="uppercase">Buffalo</span>
            <span class="text-black">Bet x2</span>
          </UButton>
          <UButton size="xl" color="orange" class="w-[160px] flex flex-col">
            <span class="uppercase">Lion</span>
            <span class="text-black">Bet x2</span>
          </UButton>
        </div>

        <!--          CONTROL BLOCK-->
        <div class="w-auto gap-0.5 flex mx-auto my-0 h-[50px]">
          <UButton size="sm" color="gray" class="flex flex-col">
            <span class="uppercase">100</span>
            <span class="text-black text-[10px]">Min</span>
          </UButton>
          <div class="flex h-full">
            <UButton
                icon="i-heroicons-minus"
                size="sm"
                color="gray"
                square
                variant="solid"
            />
            <div class="px-3 flex justify-center items-center"><span>Bet 400</span></div>
            <UButton
                icon="i-heroicons-plus"
                size="sm"
                color="gray"
                square
                variant="solid"
            />
          </div>
          <UButton size="sm" color="gray" class="flex flex-col">
            <span class="uppercase">10k</span>
            <span class="text-black text-[10px]">Max</span>
          </UButton>
        </div>


<!--        HISTORY TABLE-->
        <UTable
            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
            class="w-full text-white"
            :columns="[{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'title', label: 'Title' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role' }]"
        />
      </div>
    </main-wrapper>
  </div>
</template>
<script setup lang="ts">
const userStore = useUserStore()

const { user } = userStore.user
</script>
<style scoped>

</style>