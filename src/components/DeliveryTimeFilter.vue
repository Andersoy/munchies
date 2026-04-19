<script setup lang="ts">
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import { deliveryTimes } from '@/constants/filters.ts'
const { layout = 'horizontal' } = defineProps<{
  layout?: 'horizontal' | 'vertical'
}>()
const store = useRestaurantStore()

function toggleFilter(time: number) {
  const index = store.activeFilters.deliveryTime.indexOf(time)
  if (index === -1) {
    store.activeFilters.deliveryTime.push(time)
  } else {
    store.activeFilters.deliveryTime.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <h3
      :class="layout === 'horizontal' ? 'mb-[10px]' : 'mb-[4]'"
      class="text-[12px] font-[590] leading-none tracking-[-0.5px] uppercase opacity-40"
    >
      Delivery time
    </h3>
    <div :class="layout === 'horizontal' ? 'flex flex-row' : 'flex flex-col'" class="gap-2.5">
      <!-- TODO: find active border color from Figma -->
      <button
        @click="toggleFilter(time.value)"
        v-for="time in deliveryTimes"
        :key="time.value"
        :class="
          store.activeFilters.deliveryTime.includes(time.value)
            ? 'border-blue-500'
            : 'border-black/10'
        "
        class="h-[31px] py-2 px-3 rounded-lg border-[0.6px] bg-white card-shadow cursor-pointer text-[12px] font-normal leading-[125%] tracking-[-0.5px]"
      >
        {{ time.label }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
