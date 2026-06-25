'use client'

import { useState } from 'react'
import { Product, Semifinihed, Dish, TabType } from './types'
import ProductForm from './ProductForm'
import CompositeForm from './CompositeForm'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('products')

  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', title: 'Картофель свежий', unit: 'кг', description: 'Для варки и жарки' },
    { id: 'p2', title: 'Филе куриное', unit: 'кг', description: 'Охлажденное' }
  ])
  const [semifinished, setSemifinihed] = useState<Semifinihed[]>([
    { id: 'sf1', title: 'Пюре картофельное', yieldAmount: '1000г', ingredients: [{ itemId: 'p1', type: 'product', amount: '1.2' }] }
  ])
  const [dishes, setDishes] = useState<Dish[]>([])

  const getItemTitleById = (id: string) => {
    const prod = products.find(p => p.id === id)
    if (prod) return `${prod.title} (${prod.unit})`
    const sf = semifinished.find(s => s.id === id)
    if (sf) return `${sf.title} (п/ф)`
    return 'Неизвестный элемент'
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-orange-600 tracking-wide">🍳 Koza Family</h1>
          <p className="text-xs text-gray-400 mt-1">Панель управления</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button onClick={() => setActiveTab('products')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'products' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}>📦 Товары</button>
          <button onClick={() => setActiveTab('semifinished')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'semifinished' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}>🍱 Полуфабрикаты</button>
          <button onClick={() => setActiveTab('dishes')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'dishes' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}>🍽️ Блюда</button>
          <button onClick={() => setActiveTab('employees')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'employees' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}>👥 Сотрудники</button>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">
        {activeTab === 'products' && (
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Товары (Сырье)</h2>
            <ProductForm products={products} setProducts={setProducts} />
            <div className="grid grid-cols-1 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{p.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{p.description || 'Нет описания'}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold text-sm">{p.unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'semifinished' && (
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Полуфабрикаты (Заготовки)</h2>
            <CompositeForm type="semifinished" products={products} semifinished={semifinished} dishes={dishes} setSemifinihed={setSemifinihed} setDishes={setDishes} />
            <div className="space-y-4">
              {semifinished.map(sf => (
                <div key={sf.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xl font-bold text-gray-800">{sf.title}</h4>
                    <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-bold">Выход: {sf.yieldAmount}</span>
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <ul className="list-disc list-inside space-y-1">
                      {sf.ingredients.map((ing, i) => (
                        <li key={i}>{getItemTitleById(ing.itemId)} — <span className="font-semibold text-gray-800">{ing.amount}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dishes' && (
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Блюда (Основное меню)</h2>
            <CompositeForm type="dish" products={products} semifinished={semifinished} dishes={dishes} setSemifinihed={setSemifinihed} setDishes={setDishes} />
            <div className="space-y-4">
              {dishes.length === 0 ? (
                <p className="text-center text-gray-500 bg-white p-8 rounded-xl border border-gray-200">Блюд пока не добавлено.</p>
              ) : (
                dishes.map(dish => (
                  <div key={dish.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xl font-bold text-gray-800">{dish.title}</h4>
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold">Выход: {dish.yieldAmount}</span>
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <ul className="list-disc list-inside space-y-1">
                        {dish.ingredients.map((ing, i) => (
                          <li key={i}>{getItemTitleById(ing.itemId)} — <span className="font-semibold text-gray-800">{ing.amount}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Сотрудники</h2>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <p className="text-gray-500">Раздел персонала управления сменами ресторана Koza Family.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
