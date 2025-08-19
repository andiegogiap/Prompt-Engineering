
import React from 'react';

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <aside className="w-48 bg-background/50 backdrop-blur-sm border-r border-border/30 flex-col h-screen hidden sm:flex">
      <div className="p-4 border-b border-border/30">
        <h2 className="text-lg font-semibold font-display mb-2">Categories</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="space-y-1 p-4 pt-0 mt-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full justify-start text-sm py-2 px-3 h-auto relative overflow-hidden ${
                category === selectedCategory ? 'bg-neon-blue text-black shadow-lg shadow-neon-blue/40 font-bold' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
