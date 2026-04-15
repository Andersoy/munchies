<script setup lang="ts">
import FilterBar from '@/components/FilterBar.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import RestaurantList from '@/components/RestaurantList.vue'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import { onMounted } from 'vue'

const store = useRestaurantStore()
onMounted(async () => {
  await Promise.all([store.fetchRestaurants(), store.fetchFilters()])
})
</script>

<template>
  <main class="flex ml-10 gap-5 max-w-360 mx-auto">
    <FilterSidebar />
    <div class="flex-1">
      <FilterBar />
      <h2 class="text-[40px] font-normal leading-none tracking-[-0.5px] mt-10 mb-8">Restaurants</h2>
      <RestaurantList />
    </div>
  </main>
</template>
