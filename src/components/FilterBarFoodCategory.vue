<script setup lang="ts">
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import { BASE_URL } from '@/constants/api.ts'

const store = useRestaurantStore()

</script>

<template>
    <div class="flex overflow-x-auto gap-[10px] pr-5 pb-2">
      <button
        v-for="foodCategory in store.foodCategoryFilters"
        :key="foodCategory.id"
        @click="store.toggleFilters('foodCategory', foodCategory.id)"
        :class="
          store.activeFilters.foodCategory.includes(foodCategory.id)
            ? 'border-blue-500'
            : 'border-black/10'
        "
        class="card-shadow w-[160px] h-[80px] shrink-0 rounded-[8px] border-[0.6px] bg-white flex justify-between overflow-hidden cursor-pointer"
      >
        <span class="pt-4 pl-3 text-[14px] font-normal leading-none tracking-[-0.5px]">{{
          foodCategory.name
        }}</span>
        <img
          :src="BASE_URL + foodCategory.imageUrl"
          :alt="foodCategory.name"
          class="w-20 h-20 mr-[-10px]"
        />
      </button>
    </div>

</template>

<style scoped></style>
