import React from 'react'
import { Wand2 } from 'lucide-react'

interface IngredientInputProps {
  ingredients: string
  setIngredients: (value: string) => void
  onGenerate: () => void
  isLoading: boolean
}

export default function IngredientInput({ ingredients, setIngredients, onGenerate, isLoading }: IngredientInputProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas (e.g., chicken, garlic, lemon, olive oil)"
          className="w-full px-4 py-3 text-white bg-black border border-white/20 rounded-xl focus:border-white focus:ring-2 focus:ring-white/20 min-h-[120px] resize-none placeholder:text-gray-500 transition-all"
          disabled={isLoading}
        />
        <button
          onClick={onGenerate}
          disabled={isLoading || !ingredients.trim()}
          className="w-full bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
              <span>Creating your recipe...</span>
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              <span>Generate Recipe</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}