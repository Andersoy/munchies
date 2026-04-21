<script setup lang="ts">
import FilterBar from '@/components/FilterBar.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import RestaurantList from '@/components/RestaurantList.vue'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import { onMounted } from 'vue'
import FilterGroup from '@/components/FilterGroup.vue'
import { deliveryTimes } from '@/constants/filters.ts'


const store = useRestaurantStore()
onMounted(async () => {
  await Promise.all([store.fetchRestaurants(), store.fetchFilters()])
})
</script>

<template>
  <main class="md:flex md:ml-10 md:gap-5 md:max-w-360 mx-auto">
    <FilterSidebar class="hidden md:block pl-5" />
    <div class="flex-1">
      <FilterGroup
        class="md:hidden pt-5 px-5"
        :layout="'horizontal'"
        filter-key="deliveryTime"
        :options="deliveryTimes"
        title="Delivery Time"
      />
      <FilterGroup
        class="md:hidden pt-5 px-5"
        :layout="'horizontal'"
        filter-key="priceRange"
        :options="store.priceRangeOptions"
        title="Delivery Time"
      />

      <!--      Only show filterbar if API returns filters-->
      <FilterBar v-if="store.foodCategoryFilters.length > 0" class="px-5 mt-6" />
      <h2 class="px-5 text-[20px] font-normal leading-none tracking-[-0.5px] mt-6 mb-8">
        Restaurants
      </h2>
      <RestaurantList class="px-5" />
    </div>
  </main>
</template>
