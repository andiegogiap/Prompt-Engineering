
import React from 'react';

interface ConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  systemOrchestratorInstruction: string;
  setSystemOrchestratorInstruction: (value: string) => void;
  aiSupervisorInstruction: string;
  setAiSupervisorInstruction: (value: string) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  isOpen,
  onClose,
  systemOrchestratorInstruction,
  setSystemOrchestratorInstruction,
  aiSupervisorInstruction,
  setAiSupervisorInstruction,
}) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`fixed top-0 right-0 w-full max-w-md h-full bg-background border-l border-border/50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="config-panel-title"
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-4 border-b border-border/50">
            <h2 id="config-panel-title" className="text-xl font-bold font-display">Custom Instructions</h2>
            <button onClick={onClose} className="p-1 rounded-full text-2xl leading-none hover:bg-accent" aria-label="Close settings panel">&times;</button>
          </header>
          <div className="flex-1 p-4 overflow-y-auto space-y-6">
            <div>
              <label htmlFor="system-orchestrator" className="block text-sm font-medium text-neon-purple mb-2 font-display">
                System Orchestrator
              </label>
              <textarea
                id="system-orchestrator"
                rows={10}
                className="w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                value={systemOrchestratorInstruction}
                onChange={(e) => setSystemOrchestratorInstruction(e.target.value)}
                placeholder="Enter instructions for the high-level system orchestrator..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                This instruction guides the overall multi-agent system, task delegation, and workflow management.
              </p>
            </div>
            <div>
              <label htmlFor="ai-supervisor" className="block text-sm font-medium text-neon-blue mb-2 font-display">
                AI Supervisor (Chat)
              </label>
              <textarea
                id="ai-supervisor"
                rows={10}
                className="w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                value={aiSupervisorInstruction}
                onChange={(e) => setAiSupervisorInstruction(e.target.value)}
                placeholder="Enter instructions for the AI chat assistant..."
              />
               <p className="text-xs text-muted-foreground mt-1">
                This instruction (system prompt) is passed to the AI in the chat modal to define its personality and goals.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
