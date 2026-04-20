<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
const { filters } = storeToRefs(useRestaurantStore())
import { BASE_URL } from '@/constants/api.ts'
import { onMounted, useTemplateRef } from 'vue'

const scrollContainer = useTemplateRef('scrollContainer')

// let startX: number = 0
// let scrollLeft: number = 0
// let isDragging: boolean = false
//
// function onMouseDown(Event: MouseEvent) {
//   isDragging = true
//   startX = Event.pageX
// }
// function onMouseMove(Event: MouseEvent) {}
// function onMouseUp(Event: MouseEvent) {
//   scrollLeft = scrollContainer.value?.scrollLeft
//   isDragging = false
// }
</script>

<template>
  <div class="flex overflow-x-auto gap-[10px]" ref="scrollContainer">
    <div
      v-for="filter in filters"
      :key="filter.id"
      class="card-shadow w-[160px] h-[80px] shrink-0 rounded-[8px] border-[0.6px] border-black/10 bg-white flex justify-between overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <span class="pt-4 pl-3 text-[14px] font-normal leading-none tracking-[-0.5px]">{{
        filter.name
      }}</span>
      <img :src="BASE_URL + filter.imageUrl" :alt="filter.name" class="w-20 h-20 mr-[-10px]" />
    </div>
  </div>
</template>

<style scoped></style>
