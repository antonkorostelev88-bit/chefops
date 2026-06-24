'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

// Инициализируем клиент Supabase прямо в браузере
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Recipe {
  id: number
  title: string
  ingredients: string
  instructions: string
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Поля формы
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  // Загрузка рецептов при открытии страницы
  async function fetchRecipes() {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else if (data) {
      setRecipes(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  // Обработчик отправки формы
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title) return

    const { error } = await supabase.from('recipes').insert([
      { title, ingredients, instructions }
    ])

    if (error) {
      alert('Ошибка при сохранении: ' + error.message)
    } else {
      // Очищаем форму и заново скачиваем список
      setTitle('')
      setIngredients('')
      setInstructions('')
      fetchRecipes()
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-orange-600 text-center">🍳 Книга рецептов ChefOps</h1>
        
        {/* Форма */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Добавить новый рецепт</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Название блюда *</label>
              <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="например, Борщ домашний"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Ингредиенты (через запятую)</label>
              <input 
                type="text" 
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="картофель, свекла, мясо, капуста..."
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Инструкция по приготовлению</label>
              <textarea 
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Шаг 1. Сварить бульон..."
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-orange-600 text-white font-semibold p-3 rounded-lg hover:bg-orange-700 transition shadow"
            >
              Сохранить в книгу рецептов
            </button>
          </form>
        </div>

        {/* Список */}
        <div className="space-y-6">
          {error && <div className="p-4 text-red-500 bg-red-50 rounded-lg border border-red-200">Ошибка: {error}</div>}
          {loading && <p className="text-center text-gray-500">Загрузка рецептов...</p>}
          
          {!loading && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">{recipe.title}</h2>
                
                {recipe.ingredients && (
                  <div className="mb-4">
                    <strong className="text-sm text-gray-500 block mb-1">Ингредиенты:</strong>
                    <p className="text-gray-700 bg-orange-50 p-3 rounded-lg border border-orange-100 font-medium">
                      {recipe.ingredients}
                    </p>
                  </div>
                )}

                {recipe.instructions && (
                  <div>
                    <strong className="text-sm text-gray-500 block mb-1">Инструкция по приготовлению:</strong>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{recipe.instructions}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            !loading && <p className="text-center text-gray-500">Рецептов пока нет. Заполните форму выше!</p>
          )}
        </div>
      </div>
    </main>
  )
}
