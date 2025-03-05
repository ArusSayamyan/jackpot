<template>
  <div class="relative flex justify-center items-center h-screen bg-[radial-gradient(closest-side_at_50%_50%,_#2B5DD6_0%,_#081014_100%)]">
    <img src="~/assets/images/lion.png" class="absolute left-0 top-0 w-[35%] opacity-20">
    <img src="~/assets/images/buffalo.png" class="absolute right-0 top-0 w-[35%] scale-x-[-1] opacity-20">
    <slot></slot>
  </div>
</template>
