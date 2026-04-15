<script setup lang="ts">
import type { Restaurant } from '@/types/restaurant-types'

const { restaurant } = defineProps<{
  restaurant: Restaurant
}>()

</script>

<template>
  <div class="w-81.75 h-50.5 rounded-lg border-[0.6px] border-black/10 bg-white p-4">
    <h3>{{ restaurant.name }}</h3>
  </div>
</template>

<style scoped></style>
