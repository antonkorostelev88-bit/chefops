'use client'

import { useState } from 'react'
import { Product } from './types'

interface Props {
  products: Product[]
  setProducts: (p: Product[]) => void
}

export default function ProductForm({ products, setProducts }: Props) {
  const [pTitle, setPTitle] = useState('')
  const [pUnit, setPUnit] = useState('кг')
  const [pDesc, setPDesc] = useState('')

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pTitle) return
    const newProduct: Product = {
      id: 'p_' + Date.now(),
      title: pTitle,
      unit: pUnit,
      description: pDesc
    }
    setProducts([...products, newProduct])
    setPTitle('')
    setPDesc('')
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Добавить новый товар</h3>
      <form onSubmit={handleProductSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-1">Название товара *</label>
            <input type="text" required value={pTitle} onChange={(e) => setPTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="например, Молоко 3.2%" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Мера изм. *</label>
            <select value={pUnit} onChange={(e) => setPUnit(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none">
              <option value="кг">кг</option>
              <option value="л">л</option>
              <option value="шт">шт</option>
              <option value="г">г</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Описание товара</label>
          <input type="text" value={pDesc} onChange={(e) => setPDesc(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Срок годности..." />
        </div>
        <button type="submit" className="w-full bg-orange-600 text-white font-semibold p-3 rounded-lg hover:bg-orange-700 transition shadow">Создать товар</button>
      </form>
    </div>
  )
}
