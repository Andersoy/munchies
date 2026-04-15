<script setup lang="ts">
import type { Restaurant } from '@/types/restaurant-types'

const { restaurant } = defineProps<{
  restaurant: Restaurant
}>()
</script>

<template>
  <div
    class="w-81.75 h-50.5 rounded-lg border-[0.6px] border-black/10 bg-white p-4 flex flex-col justify-between"
  >
    <div>{{ restaurant.isCurrentlyOpen ? 'Open' : 'Closed' }}</div>
    <h3 class="text-2xl font-normal leading-none tracking-[-0.5px]">{{ restaurant.name }}</h3>
  </div>
</template>

<style scoped></style>
