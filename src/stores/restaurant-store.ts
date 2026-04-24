import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { API_URL } from '@/constants/api.ts'
import type {
  FoodCategoryFilter,
  FilterApi,
  FiltersResponse,
  Restaurant,
  RestaurantApi,
  RestaurantAPIErrorResponse,
  RestaurantOpenStatusResponse,
  RestaurantPriceRangeResponse,
  RestaurantsResponse,
} from '@/types/restaurant-types'
import { deliveryTimes } from '@/constants/filters.ts'
import type { ActiveFilters, FilterKey, FilterOption } from '@/types/filter-types.ts'


export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurants = ref<Restaurant[]>([])
  const foodCategoryFilters = ref<FoodCategoryFilter[]>([])
  const loadingRestaurants = ref(false)
  const loadingFilters = ref(false)
  const restaurantError = ref<string | null>(null)
  const filterError = ref<string | null>(null)
  const hasSeenSplash = ref(false)
  const hasClickedContinue = ref(false)
  const activeFilters = ref<ActiveFilters>({
    deliveryTime: [],
    foodCategory: [],
    priceRange: [],
  })

  // Store price range one time to avoid unnecessary API calls
  const priceRangeCache = ref<Record<string, Promise<string>>>({})

  // Used to store price range options from the API for use in filter components
  const priceRangeOptions = ref<FilterOption[]>([])

  const filteredRestaurants = computed(() => {
    return restaurants.value
      .filter((restaurant) => {
        // Delivery time filter
        if (activeFilters.value.deliveryTime.length > 0) {
          const matchesDeliveryTime = activeFilters.value.deliveryTime.some(
            (filterValue: string): boolean => {
              //Checking if time range exists in filters
              const timeRange = deliveryTimes.find((dt): boolean => dt.value === filterValue)
              if (!timeRange) return false

              return (
                restaurant.deliveryTimeMinutes >= timeRange.min &&
                restaurant.deliveryTimeMinutes < timeRange.max
              )
            },
          )
          if (!matchesDeliveryTime) return false
        }
        // Food category filter
        if (activeFilters.value.foodCategory.length > 0) {
          const matchesFoodCategory = activeFilters.value.foodCategory.some(
            (filterValue: string): boolean => {
              //Checking if food category exists in filters
              return restaurant.filterIds.includes(filterValue)
            },
          )
          if (!matchesFoodCategory) return false
        }

        // Price range filter
        if (activeFilters.value.priceRange.length > 0) {
          const matchesPriceRange = activeFilters.value.priceRange.some(
            (filterValue: string): boolean => {
              //Checking if price range exists in filters
              return restaurant.priceRange === filterValue
            },
          )
          if (!matchesPriceRange) return false
        }

        return true
        //   Sort by placing open restaurants first
      })
      .sort((a, b) => {
        if (a.isCurrentlyOpen === b.isCurrentlyOpen) return 0
        return a.isCurrentlyOpen ? -1 : 1
      })
  })

  // API
  async function fetchRestaurants() {
    loadingRestaurants.value = true
    restaurantError.value = null
    priceRangeOptions.value = []
    priceRangeCache.value = {}

    try {
      const res = await fetch(`${API_URL}/restaurants`)

      if (!res.ok) {
        throw new Error(`Unable to fetch restaurants: ${res.status}`)
      }

      const data: RestaurantsResponse = await res.json()

      restaurants.value = await Promise.all(
        data.restaurants.map(async (restaurant: RestaurantApi) => {
          const isCurrentlyOpen = await fetchRestaurantOpenStatus(restaurant.id)
          // Set price range
          let priceRange: string = ''
          if (priceRangeCache.value[restaurant.price_range_id] === undefined) {
            priceRangeCache.value[restaurant.price_range_id] = fetchPriceRange(
              restaurant.price_range_id,
            )
          }
          priceRange =
            (await priceRangeCache.value[restaurant.price_range_id]) ?? 'Price range not found'

          // Storing price range to be used for filtering
          if (!priceRangeOptions.value.some((o) => o.value === priceRange)) {
            priceRangeOptions.value.push({ label: priceRange, value: priceRange })
            priceRangeOptions.value.sort((a, b) => a.value.length - b.value.length)
          }
          return {
            id: restaurant.id,
            name: restaurant.name,
            filterIds: restaurant.filter_ids,
            imageUrl: restaurant.image_url,
            deliveryTimeMinutes: restaurant.delivery_time_minutes,
            priceRange: priceRange,
            isCurrentlyOpen,
          }
        }),
      )
    } catch (err) {
      restaurantError.value =
        err instanceof Error ? err.message : 'Unknown error while fetching restaurants'
    } finally {
      loadingRestaurants.value = false
    }
  }

  async function fetchPriceRange(priceRangeId: string): Promise<string> {
    const res = await fetch(`${API_URL}/price-range/${priceRangeId}`)

    if (!res.ok) {
      return 'Price range not found'
    }
    const data: RestaurantPriceRangeResponse | RestaurantAPIErrorResponse = await res.json()
    if ('error' in data && data.error) {
      return 'Price range not found'
    }

    if ('range' in data) {
      return data.range
    }
    return 'Price range not found'
  }

  async function fetchRestaurantOpenStatus(restaurantId: string): Promise<boolean> {
    const res = await fetch(`${API_URL}/open/${restaurantId}`)

    if (!res.ok) {
      return false
    }

    const data: RestaurantOpenStatusResponse | RestaurantAPIErrorResponse = await res.json()
    if ('error' in data && data.error) {
      return false
    }

    if ('is_open' in data) {
      return data.is_open
    }

    return false
  }

  async function fetchFilters() {
    loadingFilters.value = true
    filterError.value = null

    try {
      const res = await fetch(`${API_URL}/filter`)

      if (!res.ok) {
        throw new Error(`Failed to fetch filters: ${res.status}`)
      }

      const data: FiltersResponse = await res.json()

      foodCategoryFilters.value = data.filters.map((filter: FilterApi) => ({
        id: filter.id,
        name: filter.name,
        imageUrl: filter.image_url,
      }))
    } catch (err) {
      filterError.value = err instanceof Error ? err.message : 'Unknown error while fetching filters'
    } finally {
      loadingFilters.value = false
    }
  }

  function toggleFilters(filterKey: FilterKey, filterValue: string) {
    const index = activeFilters.value[filterKey].indexOf(filterValue)
    if (index === -1) {
      activeFilters.value[filterKey].push(filterValue)
    } else {
      activeFilters.value[filterKey].splice(index, 1)
    }
  }

  return {
    restaurants,
    foodCategoryFilters,
    activeFilters,
    filteredRestaurants,
    loadingRestaurants,
    restaurantError,
    filterError,
    fetchRestaurants,
    fetchFilters,
    hasSeenSplash,
    hasClickedContinue,
    toggleFilters,
    priceRangeOptions,
  }
});
