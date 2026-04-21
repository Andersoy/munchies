<script setup lang="ts">
import { useRestaurantStore } from '@/stores/restaurant-store.ts'

type FilterKey = 'deliveryTime' | 'foodCategory' | 'priceRange'

const store = useRestaurantStore()

const { layout = 'horizontal' } = defineProps<{
  layout?: 'horizontal' | 'vertical'
  filterKey: FilterKey
  options: { label: string; value: string | number }[]
  title: string
}>()

function toggleFilter(option: number | string) {
  const index = (store.activeFilters[filterKey] as (number | string)[]).indexOf(option)
  if (index === -1) {
    store.activeFilters[filterKey].push(option)
  } else {
    store.activeFilters[filterKey].splice(index, 1)
  }
}
</script>

<template>
  <div>
    <h3
      :class="layout === 'horizontal' ? 'mb-[10px]' : 'mb-[4]'"
      class="text-[12px] font-[590] leading-none tracking-[-0.5px] uppercase opacity-40"
    >
      {{title}}
    </h3>
    <div :class="layout === 'horizontal' ? 'flex flex-row' : 'flex flex-col'" class="gap-2.5">
      <!-- TODO: find active border color from Figma -->
      <button
        @click="toggleFilter(option.value)"
        v-for="option in options"
        :key="option.value"
        :class="
          store.activeFilters.deliveryTime.includes(option.value)
            ? 'border-blue-500'
            : 'border-black/10'
        "
        class="h-[31px] py-2 px-3 rounded-lg border-[0.6px] bg-white card-shadow cursor-pointer text-[12px] font-normal leading-[125%] tracking-[-0.5px]"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
