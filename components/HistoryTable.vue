<template>
  <div>
    <UTabs :items="items" />

    <UTable
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'No items.'
      }"
      :rows="betHistory"
      :columns="tableColumns"
      class="w-full text-white bg-[#25354D]"
      rowClass="text-white"
      background="bg-[#274B69]"
    />
  </div>
</template>

<script setup lang="ts">
import { tableColumns } from '~/constants/constants'

interface BetHistoryData {
  id: string
  date: string
  stake: string
  status: string
  pick: string
}

defineProps<{
  betHistory: BetHistoryData[]
  items: { label: string }[]
}>()
</script>
