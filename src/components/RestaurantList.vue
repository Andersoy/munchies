<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'

const store = useRestaurantStore()
const { restaurants } = storeToRefs(store)
</script>

<template>
  <div>RestaurantList</div>

  <div v-for="restaurant in restaurants" :key="restaurant.id">
    {{ restaurant.name }}
  </div>
</template>

<style scoped></style>
