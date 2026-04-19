<script setup lang="ts">
import type { Restaurant } from '@/types/restaurant-types'
import { deliveryTimes } from '@/constants/filters.ts'
import ArrowIcon from '@/assets/icons/arrow.svg?component'

const { restaurant } = defineProps<{
  restaurant: Restaurant
}>()

function formatDeliveryTime(deliveryTimeInMinutes: number) {
  const timeRange = deliveryTimes.find(
    (dt) => deliveryTimeInMinutes >= dt.min && deliveryTimeInMinutes < dt.max,
  )

  return timeRange?.label
}
</script>

<template>
  <!--  TODO Add hover effect-->
  <button class="cursor-pointer">
    <div
      class="card-shadow w-[327px] h-[202px] rounded-[8px] border-[0.6px] border-black/10 bg-white p-4 flex flex-col justify-between"
    >
      <div class="flex flex-row gap-1">
        <!--      Open status-->
        <div
          class="flex gap-1 items-center card-shadow rounded-[88px] border-[0.6px] border-black/10 bg-white py-2 pr-3 pl-[10px]"
        >
          <span
            :class="restaurant.isCurrentlyOpen ? 'bg-[#00703A]' : 'bg-black'"
            class="w-2 h-2 rounded-full"
          />
          <span class="text-[12px] font-normal leading-none tracking-[-0.5px]">{{
            restaurant.isCurrentlyOpen ? 'Open' : 'Closed'
          }}</span>
        </div>
        <!--      delivery time-->
        <span
          class="card-shadow rounded-[88px] border-[0.6px] border-black/10 bg-white py-2 px-3 text-[12px] font-normal leading-none tracking-[-0.5px]"
        >
          {{ formatDeliveryTime(restaurant.deliveryTimeMinutes) }}
        </span>
      </div>
      <div class="flex flex-row justify-between">
        <h3 class="text-[24px] font-normal leading-none tracking-[-0.5px]">
          {{ restaurant.name }}
        </h3>
        <!--      green button-->
        <div class="w-8 h-8 rounded-full bg-[#00703A] flex items-center justify-center">
          <ArrowIcon />
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped></style>
