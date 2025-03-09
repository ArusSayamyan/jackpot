<template>
  <div>
    <UTabs :items="items" class="w-full bg-[#4D6C8B]"/>
    <UTable
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
        class="w-full text-white bg-[#25354D]"
        :rows="betHistory"
        rowClass="text-white"
        background="bg-[#274B69]"
        :columns="tableColumns"
    />
  </div>
</template>

<script setup lang="ts">
import { tableColumns } from "~/constants/constants";

interface TabItem {
  label: string
}
interface BetHistoryData {
  id: string,
  date: string,
  stake: string,
  status: string,
  pick: string,
}

defineProps<{
  betHistory: BetHistoryData[];
  items: TabItem[];
}>();

</script>
