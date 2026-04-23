<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import RestaurantCard from '@/components/RestaurantCard.vue'
import RestaurantCardSkeleton from '@/components/RestaurantCardSkeleton.vue'

const store = useRestaurantStore()
const { filteredRestaurants, restaurantError, loadingRestaurants } = storeToRefs(store)
</script>

<template>
  <!-- Skeleton: loading screen -->
  <div
    v-if="loadingRestaurants"
    class="grid grid-cols-1 md:grid-cols-3 gap-[10px] md:gap-[17px] max-w-[1015px] pb-10"
  >
    <RestaurantCardSkeleton v-for="n in 6" :key="n" />
  </div>

  <!-- Error -->
  <div v-else-if="restaurantError" class="flex flex-col items-center justify-center py-20 gap-4">
    <p>Something went wrong</p>
    <button
      type="button"
      @click="store.fetchRestaurants()"
      class="w-[327px] h-[56px] bg-[#00703A] rounded-lg border border-white text-[16px] font-bold leading-none tracking-[-0.5px] text-white mx-auto block cursor-pointer"
    >
      Try again
    </button>
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-[10px] md:gap-[17px] max-w-[1015px] pb-10">
    <RestaurantCard
      v-for="restaurant in filteredRestaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
    />
  </div>
</template>

<style scoped></style>
