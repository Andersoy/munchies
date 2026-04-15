export interface RestaurantApi {
  id: string
  name: string
  rating: number
  filter_ids: string[]
  image_url: string
  delivery_time_minutes: number
  price_range_id: string
}

export interface RestaurantsResponse {
  restaurants: RestaurantApi[]
}

export interface FilterApi {
  id: string
  name: string
  image_url: string
}

export interface FiltersResponse {
  filters: FilterApi[]
}

export interface RestaurantOpenStatusResponse {
  restaurant_id: string
  is_currently_open: boolean
}

export interface RestaurantOpenStatusErrorResponse {
  error: true
  reason: string
}

export interface Restaurant {
  id: string
  name: string
  rating: number
  filterIds: string[]
  imageUrl: string
  deliveryTimeMinutes: number
  priceRangeId: string
  isCurrentlyOpen: boolean
}

export interface Filter {
  id: string
  name: string
  imageUrl: string
}
