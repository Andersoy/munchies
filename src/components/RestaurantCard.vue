<script setup lang="ts">
import type { Restaurant } from '@/types/restaurant-types'

const { restaurant } = defineProps<{
  restaurant: Restaurant
}>()



</script>

<template>
  <div
    class="card-shadow w-[327px] h-[202px] rounded-[8px] border-[0.6px] border-black/10 bg-white p-4 flex flex-col justify-between"
  >
    <div class="flex flex-row gap-1">
      <div
        class="flex flex-row gap-1 items-center card-shadow rounded-[88px] border-[0.6px] border-black/10 bg-white py-2 pr-3 pl-[10px]"
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
      <div>{{ restaurant.deliveryTimeMinutes }}</div>
    </div>
    <div class="flex flex-row justify-between">
      <h3 class="text-[24px] font-normal leading-none tracking-[-0.5px]">{{ restaurant.name }}</h3>
      <!--      green button-->
      <div></div>
    </div>
  </div>
</template>

<style scoped></style>
