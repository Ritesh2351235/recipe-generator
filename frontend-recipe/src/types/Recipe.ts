export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  dietaryRestrictions: string[];
  prepTime: string;
  cookingTime: string;
  servings: number;
}