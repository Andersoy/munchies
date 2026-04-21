<script setup lang="ts">
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import { storeToRefs } from 'pinia'
const { foodCategoryFilters } = storeToRefs(useRestaurantStore())

const store = useRestaurantStore()

</script>

<template>
  <div>
    <h3
      class="text-[12px] font-[590] leading-none tracking-[-0.5px] uppercase opacity-40"
    >
      Food Category
    </h3>
    <div class="gap-2.5 flex flex-col">
      <!-- TODO: find active border color from Figma -->
      <button
        @click="store.toggleFilters('foodCategory', foodCategory.id)"
        v-for="foodCategory in foodCategoryFilters"
        :key="foodCategory.id"
        :class="
          store.activeFilters['foodCategory'].includes(foodCategory.id)
            ? 'border-blue-500'
            : 'border-black/10'
        "
        class="h-[31px] py-2 px-3 rounded-lg border-[0.6px] bg-white card-shadow cursor-pointer text-[12px] font-normal leading-[125%] tracking-[-0.5px]"
      >
        {{ foodCategory.name }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
