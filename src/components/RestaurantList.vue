<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import RestaurantCard from '@/components/RestaurantCard.vue'

const store = useRestaurantStore()
const { filteredRestaurants } = storeToRefs(store)
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1015px] pb-10">
    <RestaurantCard
      v-for="restaurant in filteredRestaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>

<style scoped></style>
