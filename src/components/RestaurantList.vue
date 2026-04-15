<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import RestaurantCard from '@/components/RestaurantCard.vue'

const store = useRestaurantStore()
const { restaurants } = storeToRefs(store)
</script>

<template>
  <div class="flex flex-wrap gap-4.25">
    <RestaurantCard
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>

<style scoped></style>
