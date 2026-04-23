<script setup lang="ts">
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import type { FilterKey, FilterOption } from '@/types/filter-types.ts'

const store = useRestaurantStore()

const { compact = false } = defineProps<{
  layout?: 'horizontal' | 'vertical'
  filterKey: FilterKey
  options: FilterOption[]
  title: string
  compact?: boolean
}>()
</script>

<template>
  <div v-if="options.length > 0">
    <h3
      class="mb-[10px] md:mb-[16px] text-[12px] font-[590] leading-none tracking-[-0.5px] uppercase opacity-40"
    >
      {{ title }}
    </h3>
    <div
      :class="layout === 'horizontal' ? 'flex flex-row flex-wrap' : 'flex flex-col'"
      class="gap-2.5"
    >
      <button
        type="button"
        v-for="option in options"
        @click="store.toggleFilters(filterKey, option.value)"
        :key="option.value"
        :class="[
          store.activeFilters[filterKey].includes(option.value)
            ? 'border-[#00703A] filter-active-shadow'
            : 'border-black/10 card-shadow',
          compact ? 'px-2' : 'px-3',
        ]"
        class="h-[31px] py-2 rounded-lg border-[0.6px] bg-white cursor-pointer text-[12px] font-normal leading-[125%] tracking-[-0.5px] whitespace-nowrap w-fit"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
