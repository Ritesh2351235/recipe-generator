import React from 'react';
import { CookingPot } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <CookingPot className="h-8 w-8 text-white-500" />
            <span className="text-xl font-bold ">RecipeAI</span>
          </div>
          
        </div>
      </nav>
    </header>
  );
}