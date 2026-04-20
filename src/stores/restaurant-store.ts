import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { API_URL } from '@/constants/api.ts'
import type {
  Filter,
  FilterApi,
  FiltersResponse,
  Restaurant,
  RestaurantApi,
  RestaurantOpenStatusErrorResponse,
  RestaurantOpenStatusResponse,
  RestaurantsResponse,
} from '@/types/restaurant-types'
import { deliveryTimes } from '@/constants/filters.ts'


export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurants = ref<Restaurant[]>([]);
  const filters = ref<Filter[]>([]);
  const loadingRestaurants = ref(false);
  const loadingFilters = ref(false);
  const error = ref<string | null>(null);
  const hasSeenSplash = ref(false);
  const hasClickedContinue = ref(false);
  const activeFilters = ref({
    deliveryTime: [] as number[],
    foodCategory: [] as string[],
    priceRange: [] as string[],
  });

  const filteredRestaurants = computed(() => {
    return restaurants.value.filter((restaurant) => {
      // Delivery time filter
      if (activeFilters.value.deliveryTime.length > 0) {
        const matchesDeliveryTime = activeFilters.value.deliveryTime.some((filterValue:number):boolean => {

          //Checking if time range exists in filters
          const timeRange = deliveryTimes.find((dt):boolean => dt.value === filterValue)
          if (!timeRange) return false;

          return (
            restaurant.deliveryTimeMinutes >= timeRange.min &&
            restaurant.deliveryTimeMinutes < timeRange.max
          );
        });
        if (!matchesDeliveryTime) return false;
      }

      // Food category filter
      // TODO

      // Price range filter
      // TODO

      return true
    });
  });

  async function fetchRestaurants() {
    loadingRestaurants.value = true;
    error.value = null;

    try {
      const res = await fetch(`${API_URL}/restaurants`);

      if (!res.ok) {
        throw new Error(`Kunne ikke hente restauranter: ${res.status}`);
      }

      const data: RestaurantsResponse = await res.json();

      const restaurantsWithStatus = await Promise.all(
        data.restaurants.map(async (restaurant: RestaurantApi) => {
          const isCurrentlyOpen = await fetchRestaurantOpenStatus(restaurant.id);

          return {
            id: restaurant.id,
            name: restaurant.name,
            rating: restaurant.rating,
            filterIds: restaurant.filter_ids,
            imageUrl: restaurant.image_url,
            deliveryTimeMinutes: restaurant.delivery_time_minutes,
            priceRangeId: restaurant.price_range_id,
            isCurrentlyOpen,
          };
        }),
      );

      restaurants.value = restaurantsWithStatus.sort((a, b) => {
        if (a.isCurrentlyOpen === b.isCurrentlyOpen) return b.rating - a.rating
        return a.isCurrentlyOpen ? -1 : 1;
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ukjent feil ved henting av restauranter';
    } finally {
      loadingRestaurants.value = false;
    }
  }

  async function fetchRestaurantOpenStatus(restaurantId: string): Promise<boolean> {

    const res = await fetch(`${API_URL}/open/${restaurantId}`);

    if (!res.ok) {
      return false;
    }

    const data: RestaurantOpenStatusResponse | RestaurantOpenStatusErrorResponse = await res.json();
    if ('error' in data && data.error) {
      return false;
    }

    if ('is_open' in data) {
      return data.is_open;
    }

    return false;
  }

  async function fetchFilters() {
    loadingFilters.value = true;
    error.value = null;

    try {
      const res = await fetch(`${API_URL}/filter`);

      if (!res.ok) {
        throw new Error(`Kunne ikke hente filters: ${res.status}`);
      }

      const data: FiltersResponse = await res.json();

      filters.value = data.filters.map((filter: FilterApi) => ({
        id: filter.id,
        name: filter.name,
        imageUrl: filter.image_url,
      }));
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ukjent feil ved henting av filters';
    } finally {
      loadingFilters.value = false;
    }
  }

  return {
    restaurants,
    filters,
    activeFilters,
    filteredRestaurants,
    loadingRestaurants,
    loadingFilters,
    error,
    fetchRestaurants,
    fetchFilters,
    hasSeenSplash,
    hasClickedContinue,
  }
});
