<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import SplashScreen from '@/components/SplashScreen.vue'
import { storeToRefs } from 'pinia'
import { useRestaurantStore } from '@/stores/restaurant-store.ts'
import { onMounted, onUnmounted } from 'vue'
const store = useRestaurantStore()
const { hasSeenSplash } = storeToRefs(store)

const handleResize = () => {
  if (window.innerWidth >= 768) {
    store.hasSeenSplash = true
  } else if (!store.hasClickedContinue) {
    store.hasSeenSplash = false
  }
}

onMounted(() => {
  if (window.innerWidth >= 768) {
    store.hasSeenSplash = true
  }
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <SplashScreen v-if="!hasSeenSplash" class="md:hidden" />
  <template v-else>
    <AppHeader />
    <RouterView />
  </template>
</template>

<style scoped></style>
