<script setup lang="ts">
import FilterGroup from '@/components/FilterGroup.vue'
</script>

<template>
  <div class="card-shadow p-6 w-59.75 rounded-[10px] border-[0.6px] border-black/10 bg-white">
    <h2 class="text-2xl font-sf leading-none font-normal tracking-[-0.5px]">Filter</h2>
<!--    Food Category-->
    <FilterGroup :layout="'vertical'" filterKey="foodCategory" options="" />
<!--    Delivery Time-->
    <FilterGroup :layout="'vertical'" filterKey="deliveryTime" options="" />
<!--    Price Range-->
    <FilterGroup :layout="'vertical'" filterKey="priceRange" options="" />
  </div>
</template>
