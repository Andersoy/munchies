<script setup lang="ts">
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { foodCategoryFilters } = storeToRefs(useRestaurantStore())
const store = useRestaurantStore()
const activeFoodCategories = computed(() =>
  foodCategoryFilters.value.filter((f) => store.activeFilters.foodCategory.includes(f.id)),
)
</script>

<!--Unsure from the design how to show the filters in this component, but since there already is a way to filter on food, -->
<!--and the design only shows 4 different food categories(even though several more exists) I made the decision-->
<!--to show only the active food categories here and when clicking on them they are removed. To change this, a small -->
<!--change in the v-for to instead loop through "store.foodCategoryFilters will change it back-->
<template>
  <div>
    <h3 class="text-[12px] font-[590] leading-none tracking-[-0.5px] uppercase opacity-40 mb-4">
      Food Category
    </h3>
    <div class="gap-2.5 flex flex-col">
      <!-- Replace 'v-for="foodCategory in activeFoodCategories"' with 'v-for="foodCategory in store.foodCategoryFilters"' to show all food categories-->
      <!-- Add this :class if showing all categories: -->
      <!-- :class="store.activeFilters.foodCategory.includes(foodCategory.id) ? 'border-blue-500' : 'border-black/10'" -->
      <button
        type="button"
        v-for="foodCategory in activeFoodCategories"
        @click="store.toggleFilters('foodCategory', foodCategory.id)"
        :key="foodCategory.id"
        class="h-[31px] py-2 px-3 rounded-[8px] border-[0.6px] border-black/10 bg-white card-shadow cursor-pointer text-[12px] font-normal leading-[125%] tracking-[-0.5px] w-fit"
      >
        {{ foodCategory.name }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
