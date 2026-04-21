<script setup lang="ts">
import FilterGroup from '@/components/FilterGroup.vue'
import { deliveryTimes } from '@/constants/filters.ts'
import FilterGroupFoodCategory from '@/components/FilterGroupFoodCategory.vue'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'

const store = useRestaurantStore()
</script>

<template>
  <div class="card-shadow p-6 w-59.75 rounded-[10px] border-[0.6px] border-black/10 bg-white">
    <h2 class="text-2xl font-sf leading-none font-normal tracking-[-0.5px]">Filter</h2>
    <!--    Food Category-->
    <FilterGroupFoodCategory />
    <!--    Delivery Time-->
    <FilterGroup
      :layout="'vertical'"
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
    />
  </div>
</template>
