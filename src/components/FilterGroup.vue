<script setup lang="ts">
import { useRestaurantStore } from '@/stores/restaurant-store.ts'

type FilterKey = 'deliveryTime' | 'priceRange'

const store = useRestaurantStore()

const { compact = false } = defineProps<{
  layout?: 'horizontal' | 'vertical'
  filterKey: FilterKey
  options: { label: string; value: string }[]
  title: string
  compact?: boolean
}>()
</script>

<template>
  <div>
    <h3
      class="mb-[10px] md:mb-[16px] text-[12px] font-[590] leading-none tracking-[-0.5px] uppercase opacity-40"
    >
      {{ title }}
    </h3>
    <div :class="layout === 'horizontal' ? 'flex flex-row flex-wrap' : 'flex flex-col'" class="gap-2.5">
      <!-- TODO: find active border color from Figma -->
      <button
        v-for="option in options"
        @click="store.toggleFilters(filterKey, option.value)"
        :key="option.value"
        :class="[
          store.activeFilters[filterKey].includes(option.value)
            ? 'border-blue-500'
            : 'border-black/10',
          compact ? 'px-2' : 'px-3',
        ]"
        class="h-[31px] py-2 rounded-lg border-[0.6px] bg-white card-shadow cursor-pointer text-[12px] font-normal leading-[125%] tracking-[-0.5px] whitespace-nowrap w-fit"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
