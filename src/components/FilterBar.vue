<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
const { foodCategoryFilters } = storeToRefs(useRestaurantStore())
import { BASE_URL } from '@/constants/api.ts'

const store = useRestaurantStore()

function toggleFoodCategory(categoryID: string) {

  const index = store.activeFilters.foodCategory.indexOf(categoryID)
  if (index === -1) {
    store.activeFilters.foodCategory.push(categoryID)
  } else {
    store.activeFilters.foodCategory.splice(index, 1)
  }
}
</script>

<template>
  <div class="flex overflow-x-auto gap-[10px]">
    <button
      v-for="foodCategory in foodCategoryFilters"
      :key="foodCategory.id"
      @click="toggleFoodCategory(foodCategory.id)"
      :class="
        store.activeFilters.foodCategory.includes(foodCategory.id) ? 'border-blue-500' : 'border-black/10'
      "
      class="card-shadow w-[160px] h-[80px] shrink-0 rounded-[8px] border-[0.6px] bg-white flex justify-between overflow-hidden cursor-pointer"
    >
      <span class="pt-4 pl-3 text-[14px] font-normal leading-none tracking-[-0.5px]">{{
        foodCategory.name
      }}</span>
      <img :src="BASE_URL + foodCategory.imageUrl" :alt="foodCategory.name" class="w-20 h-20 mr-[-10px]" />
    </button>
  </div>
</template>

<style scoped></style>
