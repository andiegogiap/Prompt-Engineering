
import React from 'react';
import { PromptCategory } from '../types';
import { PromptCard } from './PromptCard';
import { SearchIcon } from './icons';

interface MainContentProps {
  prompts: PromptCategory[];
  onSearchChange: (query: string) => void;
  onSelectPrompt: (prompt: PromptCategory) => void;
}

export const MainContent: React.FC<MainContentProps> = ({ prompts, onSearchChange, onSelectPrompt }) => {
  return (
    <>
      <div className="px-4 md:px-6 pt-4">
        <div className="relative mb-4">
          <input
            type="text"
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex rounded-md border border-input bg-background/50 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent md:text-sm w-full h-10 pl-10 pr-4 shadow-inner"
            placeholder="Search prompt categories..."
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 md:px-6 py-4">
        {prompts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {prompts.map(prompt => (
              <PromptCard key={prompt.subject} prompt={prompt} onSelectPrompt={onSelectPrompt} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground col-span-full mt-8">
            No prompt categories found matching your criteria.
          </p>
        )}
      </div>
    </>
  );
};
