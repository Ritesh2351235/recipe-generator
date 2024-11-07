import React, { useState } from 'react';
import { Header } from './components/Header';
import { IngredientInput } from './components/IngredientInput';
import { RecipeCard } from './components/RecipeCard';
import { RecipeService } from './services/recipeService';
import type { Recipe } from './types/Recipe';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const ingredientList = ingredients
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);

      if (ingredientList.length === 0) {
        throw new Error('Please enter at least one ingredient');
      }

      const generatedRecipe = await RecipeService.generateRecipe(ingredientList);
      setRecipe(generatedRecipe);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRecipe(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold  mb-4">
            Smart Recipe Generator
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Transform your available ingredients into delicious recipes using AI-powered suggestions
          </p>
        </div>

        <div className="space-y-12">
          <IngredientInput
            ingredients={ingredients}
            setIngredients={setIngredients}
            onGenerate={generateRecipe}
            isLoading={isLoading}
          />

          {error && (
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            </div>
          )}

          {recipe && <RecipeCard recipe={recipe} />}
        </div>
      </main>
    </div>
  );
}

export default App;