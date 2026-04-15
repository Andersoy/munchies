import { defineStore } from 'pinia'
import { ref } from 'vue'
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

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurants = ref<Restaurant[]>([]);
  const filters = ref<Filter[]>([]);
  const activeFilters = ref<string[]>([]);
  const loadingRestaurants = ref(false);
  const loadingFilters = ref(false);
  const error = ref<string | null>(null);

  async function fetchRestaurants() {
    loadingRestaurants.value = true;
    error.value = null;

    try {
      const res = await fetch(`${BASE_URL}/restaurants`);

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

    const res = await fetch(`${BASE_URL}/restaurants/open/${restaurantId}`);

    if (!res.ok) {
      throw new Error(`Kunne ikke hente åpen/lukket-status: ${res.status}`);
    }

    const data: RestaurantOpenStatusResponse | RestaurantOpenStatusErrorResponse = await res.json();

    if ('error' in data && data.error) {
      throw new Error(data.reason);
    }

    if ('is_currently_open' in data) {
      return data.is_currently_open
    }

    throw new Error('Ukjent feil ved henting av åpen/lukket-status')

  }

  async function fetchFilters() {
    loadingFilters.value = true;
    error.value = null;

    try {
      const res = await fetch(`${BASE_URL}/filters`);

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
    loadingRestaurants,
    loadingFilters,
    error,
    fetchRestaurants,
    fetchFilters,
  };
});
