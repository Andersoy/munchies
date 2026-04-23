export type FilterKey = 'deliveryTime' | 'foodCategory' | 'priceRange'

export interface ActiveFilters {
  deliveryTime: string[]
  foodCategory: string[]
  priceRange: string[]
}

export interface FilterOption {
  label: string
  value: string
}
