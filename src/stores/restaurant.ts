import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurants = ref([])
  const filters = ref([])
  const activeFilters = ref([])
  const openStatus = ref<Record<string, boolean>>({})

  return { restaurants, filters, activeFilters, openStatus }
})
