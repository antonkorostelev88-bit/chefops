export interface Product {
  id: string
  title: string
  unit: string
  description: string
}

export interface Semifinihed {
  id: string
  title: string
  yieldAmount: string
  ingredients: { itemId: string; type: 'product' | 'semifinished'; amount: string }[]
}

export interface Dish {
  id: string
  title: string
  yieldAmount: string
  ingredients: { itemId: string; type: 'product' | 'semifinished'; amount: string }[]
}

export type TabType = 'products' | 'semifinished' | 'dishes' | 'employees'
