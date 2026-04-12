<script setup lang="ts">
import FilterBar from '@/components/FilterBar.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import RestaurantList from '@/components/RestaurantList.vue'
</script>

<template>
  <main class="flex ml-10 gap-5">
    <FilterSidebar />
    <div>
      <FilterBar/>
      <RestaurantList />
    </div>

  </main>
</template>
