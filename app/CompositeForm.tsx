'use client'

import { useState } from 'react'
import { Product, Semifinihed, Dish } from './types'

interface Props {
  type: 'semifinished' | 'dish'
  products: Product[]
  semifinished: Semifinihed[]
  dishes: Dish[]
  setSemifinihed: (s: Semifinihed[]) => void
  setDishes: (d: Dish[]) => void
}

export default function CompositeForm({ type, products, semifinished, dishes, setSemifinihed, setDishes }: Props) {
  const [compTitle, setCompTitle] = useState('')
  const [compYield, setCompYield] = useState('')
  const [compIngredients, setCompIngredients] = useState<{ itemId: string; type: 'product' | 'semifinished'; amount: string }[]>([])

  const addIngredientRow = () => {
    // Берем ID первого доступного товара или полуфабриката
    const firstId = products[0]?.id || semifinished[0]?.id || ''
    const defaultType = products.some(p => p.id === firstId) ? 'product' : 'semifinished'
    setCompIngredients([...compIngredients, { itemId: firstId, type: defaultType, amount: '' }])
  }

  const updateIngredientRow = (index: number, field: string, value: string) => {
    const updated = [...compIngredients]
    if (field === 'item') {
      updated[index].itemId = value
      updated[index].type = products.some(p => p.id === value) ? 'product' : 'semifinished'
    } else if (field === 'amount') {
      updated[index].amount = value
    }
    setCompIngredients(updated)
  }

  const removeIngredientRow = (index: number) => {
    setCompIngredients(compIngredients.filter((_, i) => i !== index))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!compTitle || !compYield) return

    const newId = (type === 'semifinished' ? 'sf_' : 'd_') + Date.now()
    const newItem = { id: newId, title: compTitle, yieldAmount: compYield, ingredients: compIngredients }

    if (type === 'semifinished') {
      setSemifinihed([...semifinished, newItem as Semifinihed])
    } else {
      setDishes([...dishes, newItem as Dish])
    }

    setCompTitle('')
    setCompYield('')
    setCompIngredients([])
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
      <h3 className="text-lg font-bold mb-4 text-gray-800">
        {type === 'semifinished' ? 'Создать новый полуфабрикат' : 'Создать новое блюдо'}
      </h3>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-1">Название *</label>
            <input type="text" required value={compTitle} onChange={(e) => setCompTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Выход порции *</label>
            <input type="text" required value={compYield} onChange={(e) => setCompYield(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="например, 350 г" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 block">Состав (Выбор из списков):</label>
          {compIngredients.map((row, index) => (
            <div key={index} className="flex gap-3 items-center">
              <select value={row.itemId} onChange={(e) => updateIngredientRow(index, 'item', e.target.value)} className="flex-1 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none">
                {products.length > 0 && (
                  <optgroup label="📦 Товары">
                    {products.map(p => <option key={p.id} value={p.id}>{p.title} ({p.unit})</option>)}
                  </optgroup>
                )}
                {semifinished.length > 0 && (
                  <optgroup label="🍱 Полуфабрикаты">
                    {semifinished.map(sf => <option key={sf.id} value={sf.id}>{sf.title}</option>)}
                  </optgroup>
                )}
              </select>
              <input type="text" required value={row.amount} onChange={(e) => updateIngredientRow(index, 'amount', e.target.value)} className="w-32 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Кол-во" />
              <button type="button" onClick={() => removeIngredientRow(index)} className="text-red-500 p-2">❌</button>
            </div>
          ))}
          <button type="button" onClick={addIngredientRow} className="text-sm font-medium text-orange-600 hover:text-orange-700 font-semibold block">+ Добавить компонент</button>
        </div>
        <button type="submit" className="w-full bg-orange-600 text-white font-semibold p-3 rounded-lg hover:bg-orange-700 transition shadow">Сохранить</button>
      </form>
    </div>
  )
}
