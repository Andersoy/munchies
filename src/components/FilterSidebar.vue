<script setup lang="ts">
import FilterGroup from '@/components/FilterGroup.vue'
import { deliveryTimes } from '@/constants/filters.ts'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import { computed } from 'vue'

const store = useRestaurantStore()
const foodCategoryOptions = computed(() =>
  store.foodCategoryFilters.map((filter) => ({
    label: filter.name,
    value: filter.id,
  })),
)
</script>

<template>
  <div class="card-shadow p-6 w-59.75 rounded-[10px] border-[0.6px] border-black/10 bg-white">
    <h2 class="text-2xl font-sf leading-none font-normal tracking-[-0.5px] mb-8">Filter</h2>
    <!--    Food Category-->
    <div class="flex flex-col gap-8">
      <FilterGroup
        :layout="'vertical'"
        filterKey="foodCategory"
        :options="foodCategoryOptions"
        title="Food Category"
      />
      <!--    Delivery Time-->
      <FilterGroup
        :layout="'horizontal'"
        filterKey="deliveryTime"
        :options="deliveryTimes"
        title="Delivery Time"
      />
      <!--    Price Range-->
      <FilterGroup
        :layout="'horizontal'"
        filterKey="priceRange"
        :options="store.priceRangeOptions"
        title="Price Range"
        :compact="true"
      />
    </div>
  </div>
</template>
