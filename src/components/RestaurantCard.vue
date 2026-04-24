<script setup lang="ts">
import type { Restaurant } from '@/types/restaurant-types'
import { deliveryTimes } from '@/constants/filters.ts'
import ArrowIcon from '@/assets/icons/arrow.svg?component'
import { BASE_URL } from '@/constants/api.ts'

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
  <div role="button" tabindex="0"
    class="card-shadow w-full h-[202px] rounded-[8px] border-[0.6px] border-black/10 bg-white cursor-pointer relative overflow-hidden"
  >
    <div
      v-if="!restaurant.isCurrentlyOpen"
      class="absolute left-1/2 -translate-x-1/2 top-[85px] card-shadow h-[28px] rounded-[4px] border-[0.6px] border-black/10 bg-[#FAFAFA] py-2 pr-3 pl-[10px] flex items-center"
    >
      <span class="text-[12px] font-normal leading-none tracking-[-0.5px] whitespace-nowrap"
        >Currently closed</span
      >
    </div>

    <img
      :src="BASE_URL + restaurant.imageUrl"
      :alt="restaurant.name"
      loading="lazy"
      class="absolute -right-7.5 -top-7.5 w-[140px] h-[140px] object-cover rounded-[8px]"
      :class="restaurant.isCurrentlyOpen ? 'opacity-100' : 'opacity-20'"
    />
    <div class="p-4 flex flex-col justify-between h-full">
      <div class="flex gap-1">
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
          v-if="restaurant.isCurrentlyOpen"
          class="card-shadow rounded-[88px] border-[0.6px] border-black/10 bg-white py-2 px-3 text-[12px] font-normal leading-none tracking-[-0.5px]"
        >
          {{ formatDeliveryTime(restaurant.deliveryTimeMinutes) }}
        </span>
      </div>
      <div
        class="flex justify-between"
        :class="restaurant.isCurrentlyOpen ? 'opacity-100' : 'opacity-20'"
      >
        <h3 class="text-[24px] font-normal leading-none tracking-[-0.5px]">
          {{ restaurant.name }}
        </h3>
        <!--      green circle with arrow icon-->
        <div class="w-8 h-8 rounded-full bg-[#00703A] flex items-center justify-center shrink-0">
          <ArrowIcon />
        </div>
      </div>
    </div>
  </div>
</template>
