import type { Recipe } from '../types/Recipe';

export class RecipeParser {
  static parseRecipeText(recipeText: string): Partial<Recipe> {
    // Extract title
    const titleMatch = recipeText.match(/Dish:\s*(.+?)(?:\n|$)/);
    const title = titleMatch ? titleMatch[1].trim() : 'Custom Recipe';

    // Extract ingredients
    const ingredientsMatch = recipeText.match(/Ingredients:\n\n([\s\S]*?)(?=\n\nSteps:|\n\n|$)/);
    const ingredients = ingredientsMatch
      ? ingredientsMatch[1]
          .split('\n')
          .map(line => line.replace(/^\*\s*/, '').trim())
          .filter(Boolean)
      : [];

    // Extract instructions
    const stepsMatch = recipeText.match(/Steps:\n\n([\s\S]*?)(?=\n\n|$)/);
    const instructions = stepsMatch
      ? stepsMatch[1]
          .split('\n')
          .map(line => line.replace(/^\d+\.\s*/, '').trim())
          .filter(Boolean)
      : [];

    // Extract cooking time from instructions
    const cookingTimeMatch = instructions.join(' ').match(/(\d+)-?(\d+)?\s*minutes?/i);
    const cookingTime = cookingTimeMatch 
      ? `${cookingTimeMatch[1]}${cookingTimeMatch[2] ? '-'+cookingTimeMatch[2] : ''} mins`
      : '20-25 mins';

    return {
      id: Date.now().toString(),
      title,
      ingredients,
      instructions,
      cookingTime,
      prepTime: '15 mins', // Default value as it's not in the API response
      servings: 4, // Default value as it's not in the API response
      dietaryRestrictions: this.analyzeDietaryRestrictions(ingredients)
    };
  }

  private static analyzeDietaryRestrictions(ingredients: string[]): string[] {
    const restrictions: string[] = [];
    const ingredientsLower = ingredients.join(' ').toLowerCase();

    if (!/(milk|cream|cheese|butter|yogurt)/.test(ingredientsLower)) {
      restrictions.push('Dairy-Free');
    }

    if (!/(chicken|beef|pork|fish|meat|seafood)/.test(ingredientsLower)) {
      restrictions.push('Vegetarian');
    }

    if (!/(flour|bread|pasta|wheat|gluten)/.test(ingredientsLower)) {
      restrictions.push('Gluten-Free');
    }

    return restrictions;
  }
}