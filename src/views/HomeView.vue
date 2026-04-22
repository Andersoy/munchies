<script setup lang="ts">
import FilterBarFoodCategory from '@/components/FilterBarFoodCategory.vue'
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
  <main class="mx-auto md:flex md:ml-10 md:gap-5 md:max-w-360">
    <FilterSidebar class="hidden md:block pl-5" />
    <div class="flex-1 min-w-0">
      <FilterGroup
        class="px-5 md:pt-5 md:hidden"
        :layout="'horizontal'"
        filter-key="deliveryTime"
        :options="deliveryTimes"
        title="Delivery Time"
      />
      <!--      Design does not show this filter on mobile, uncomment to show-->
      <!--      <FilterGroup-->
      <!--        v-if="store.priceRangeOptions.length > 0"-->
      <!--        class="md:hidden pt-5 px-5"-->
      <!--        :layout="'horizontal'"-->
      <!--        filter-key="priceRange"-->
      <!--        :options="store.priceRangeOptions"-->
      <!--        title="Price Range"-->
      <!--      />-->

      <!--      Only show if API returns food category filters-->
      <FilterBarFoodCategory v-if="store.foodCategoryFilters.length > 0" class="pl-5 mt-6" />
      <h2 class="px-5 text-[20px] font-normal leading-none tracking-[-0.5px] mt-4 mb-8">
        Restaurants
      </h2>
      <RestaurantList class="px-5 w-full" />
    </div>
  </main>
</template>
