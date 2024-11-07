import React from 'react'
import { Clock, Users, ChefHat, Utensils } from 'lucide-react'
import type { Recipe } from '../types/Recipe'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-black rounded-xl shadow-xl overflow-hidden border border-white/10">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">{recipe.title}</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-white">
              <Clock className="h-5 w-5 text-white" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <ChefHat className="h-5 w-5 text-white" />
              <span>Cook: {recipe.cookingTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Users className="h-5 w-5 text-white" />
              <span>Serves: {recipe.servings}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Utensils className="h-5 w-5 mr-2 text-white" />
                Ingredients
              </h3>
              <ul className="space-y-2 text-white/80">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-white mr-2" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Instructions</h3>
              <ol className="space-y-3 text-white/80">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="font-bold text-white mr-2">{index + 1}.</span>
                    <span className="leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {recipe.dietaryRestrictions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {recipe.dietaryRestrictions.map((restriction, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 text-white rounded-full text-sm border border-white/20"
                  >
                    {restriction}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}