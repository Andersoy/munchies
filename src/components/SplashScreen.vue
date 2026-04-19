<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'

const store = useRestaurantStore()

function handleContinue() {
  store.hasSeenSplash = true;
  store.hasClickedContinue = true;
}
</script>

<template>
  <div class="bg-[#00703A] w-screen h-screen flex flex-col justify-between">
    <AppHeader color="white" />
    <div class="ml-6 text-white max-w-[246px]">
      <h2 class="font-display text-[48px] font-extrabold leading-none tracking-[-1px]">Treat Yourself.</h2>
      <p class="text-[14px] font-normal leading-[150%] tracking-[-0.5px]">
        Find the best restaurants in your city and get it delivered to your place!
      </p>
    </div>
    <button
      @click="handleContinue"
      class="w-[327px] h-[56px] rounded-lg border border-white mb-6 text-[16px] font-bold leading-none tracking-[-0.5px] text-white bg-transparent mx-auto block cursor-pointer"
    >
      Continue
    </button>
  </div>
</template>

<style scoped></style>
