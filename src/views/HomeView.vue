<script setup lang="ts">
import FilterBar from '@/components/FilterBar.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import RestaurantList from '@/components/RestaurantList.vue'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import { onMounted } from 'vue'
import DeliveryTimeFilter from '@/components/DeliveryTimeFilter.vue'

const store = useRestaurantStore()
onMounted(async () => {
  await Promise.all([store.fetchRestaurants(), store.fetchFilters()])
})
</script>

<template>
  <main class="px-5 md:flex md:ml-10 md:gap-5 md:max-w-360 mx-auto">
    <FilterSidebar class="hidden md:block" />
    <div class="flex-1">
      <DeliveryTimeFilter class="md:hidden" :layout="'horizontal'" />
      <FilterBar />
      <h2 class="text-[20px] font-normal leading-none tracking-[-0.5px] mt-10 mb-8">Restaurants</h2>
      <RestaurantList />
    </div>
  </main>
</template>
