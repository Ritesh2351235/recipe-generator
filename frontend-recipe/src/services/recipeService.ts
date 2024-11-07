import type { Recipe } from '../types/Recipe';
import { RecipeParser } from './recipeParser';

export class RecipeService {
  static async generateRecipe(ingredients: string[]): Promise<Recipe> {
    try {
      const response = await fetch('http://localhost:3000/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }

      const data = await response.json();
      const parsedRecipe = RecipeParser.parseRecipeText(data.recipe);
      
      return {
        ...parsedRecipe,
        id: Date.now().toString(),
        prepTime: parsedRecipe.prepTime || '15 mins',
        cookingTime: parsedRecipe.cookingTime || '25 mins',
        servings: parsedRecipe.servings || 4,
        ingredients: parsedRecipe.ingredients || [],
        instructions: parsedRecipe.instructions || [],
        dietaryRestrictions: parsedRecipe.dietaryRestrictions || [],
        title: parsedRecipe.title || 'Custom Recipe'
      } as Recipe;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to generate recipe. Please try again.');
    }
  }
}