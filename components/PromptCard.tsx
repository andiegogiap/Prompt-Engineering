
import React from 'react';
import { PromptCategory } from '../types';
import { SparklesIcon } from './icons';

interface PromptCardProps {
  prompt: PromptCategory;
  onSelectPrompt: (prompt: PromptCategory) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, onSelectPrompt }) => {
  return (
    <div 
      className="semi-transparent-card rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group h-full relative flex flex-col cursor-pointer overflow-hidden"
      onClick={() => onSelectPrompt(prompt)}
      style={{
        '--card-glow-color': prompt.color,
        border: `1px solid ${prompt.color}50`
      } as React.CSSProperties}
    >
        <div 
            className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur"
        />
        <div className="relative p-4 flex flex-col h-full flex-grow bg-background/80 rounded-lg">
            <div className="flex flex-col items-center text-center space-y-2 mb-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: `${prompt.color}20`, border: `1px solid ${prompt.color}` }}>
                    <div style={{color: prompt.color}} className="transition-transform duration-300 group-hover:scale-110">
                        {prompt.icon}
                    </div>
                </div>
                <h3 className="font-semibold text-sm font-display">{prompt.subject}</h3>
            </div>
            <p className="text-xs text-muted-foreground flex-grow overflow-hidden">{prompt.prompt_description}</p>
        </div>
        <div className="relative p-4 border-t border-border/50 flex justify-center bg-background/80 rounded-b-lg">
            <button
                onClick={(e) => { e.stopPropagation(); onSelectPrompt(prompt); }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-neon-pink text-black hover:bg-neon-pink/90 h-9 px-3 py-1 font-bold shadow-md hover:shadow-lg hover:shadow-neon-pink/50"
            >
                <SparklesIcon className="mr-2 h-4 w-4" />
                AI Suggest
            </button>
        </div>
    </div>
  );
};
