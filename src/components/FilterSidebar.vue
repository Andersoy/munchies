<script setup lang="ts">
import FilterGroup from '@/components/FilterGroup.vue'
import { deliveryTimes } from '@/constants/filters.ts'

// food category option array
// deliverytimes option array
// priceRange option array
</script>

<template>
  <div class="card-shadow p-6 w-59.75 rounded-[10px] border-[0.6px] border-black/10 bg-white">
    <h2 class="text-2xl font-sf leading-none font-normal tracking-[-0.5px]">Filter</h2>
    <!--    Food Category-->
    <FilterGroup :layout="'vertical'" filterKey="foodCategory" options="" title="Food Category" />
    <!--    Delivery Time-->
    <FilterGroup :layout="'horizontal'" filterKey="deliveryTime" options="" title="Delivery Time" />
    <!--    Price Range-->
    <FilterGroup :layout="'horizontal'" filterKey="priceRange" options="" title="Price Range" />
  </div>
</template>
