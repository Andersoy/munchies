<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import SplashScreen from '@/components/SplashScreen.vue'
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'

const store = useRestaurantStore();
const { hasSeenSplash } = storeToRefs(store)
</script>

<template>
  <SplashScreen v-if="!hasSeenSplash" class="md:hidden" />
  <AppHeader />
  <RouterView />
</template>

<style scoped></style>
