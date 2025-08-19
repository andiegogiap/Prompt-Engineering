
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { AiModal } from './components/AiModal';
import { WorkflowModal } from './components/WorkflowModal';
import { promptCategories } from './constants';
import { PromptCategory } from './types';
import { ConfigPanel } from './components/ConfigPanel';
import { SettingsIcon } from './components/icons';

const DEFAULT_ORCHESTRATOR_INSTRUCTION = "You are a master orchestrator of a multi-agent AI system. Your primary role is to ensure seamless integration, task handoff, and efficient communication between different AI models and services. When a user provides a prompt, you must first analyze its intent and break it down into a logical sequence of tasks for specialized agents (e.g., code generation agent, data analysis agent, UI design agent). You will generate a workflow plan and then supervise its execution, ensuring the final output is a cohesive and comprehensive solution that directly addresses the user's request. You leverage tools like Gemini CLI for automation.";
const DEFAULT_AI_SUPERVISOR_INSTRUCTION = "You are an expert AI prompt engineering assistant. Your goal is to help users generate, refine, and iterate on prompts. When you receive an initial topic, provide a detailed, creative, and structured prompt. More importantly, anticipate the user's needs by suggesting specific, actionable follow-up questions, alternative angles, or contextual nuances to help them refine their prompt further. Always be ready to generate code, analyze data, or create visualizations based on the refined prompt. Your responses should be clear, well-structured, and immediately useful.";

const App: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedPrompt, setSelectedPrompt] = useState<PromptCategory | null>(null);

    const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
    const [systemOrchestratorInstruction, setSystemOrchestratorInstruction] = useState<string>(DEFAULT_ORCHESTRATOR_INSTRUCTION);
    const [aiSupervisorInstruction, setAiSupervisorInstruction] = useState<string>(DEFAULT_AI_SUPERVISOR_INSTRUCTION);

    const categories = useMemo(() => ["All", ...new Set(promptCategories.map(item => item.category))], []);

    const filteredPrompts = useMemo(() => {
        let filtered = promptCategories;

        if (selectedCategory !== "All") {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        if (searchQuery) {
            const lowerCaseSearchQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                item.subject.toLowerCase().includes(lowerCaseSearchQuery) ||
                item.prompt_description.toLowerCase().includes(lowerCaseSearchQuery) ||
                item.category.toLowerCase().includes(lowerCaseSearchQuery)
            );
        }
        return filtered;
    }, [selectedCategory, searchQuery]);

    const handleSelectPrompt = (prompt: PromptCategory) => {
        setSelectedPrompt(prompt);
    };

    const handleCloseModal = () => {
        setSelectedPrompt(null);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="p-4 md:p-6 flex justify-between items-center border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <a href="/" aria-label="Home">
                            <img
                                src="https://andiegogiap.com/assets/aionex-icon-256.png"
                                alt="AIONEX"
                                style={{height: '40px', width: 'auto'}}
                            />
                        </a>
                        <h1 className="text-2xl font-bold font-display">Prompt Engineering</h1>
                    </div>
                     <button 
                        onClick={() => setIsConfigPanelOpen(true)} 
                        className="p-2 rounded-full hover:bg-accent transition-colors"
                        aria-label="Open custom instructions panel"
                    >
                        <SettingsIcon className="w-5 h-5 text-neon-blue" />
                    </button>
                </header>
                <MainContent
                    prompts={filteredPrompts}
                    onSearchChange={setSearchQuery}
                    onSelectPrompt={handleSelectPrompt}
                />
                <footer className="p-3 text-center text-xs text-muted-foreground border-t border-neon-blue/30 shadow-[0_-8px_20px_-8px_hsla(var(--neon-blue),0.6)] z-10">
                    <a href="#" className="hover:text-neon-blue transition-colors duration-300">
                        Neon-Powered Prompt Engineering Interface
                    </a>
                </footer>
            </div>
            {selectedPrompt && (
                selectedPrompt.subject === "Workflow Visualization"
                    ? <WorkflowModal onClose={handleCloseModal} />
                    : <AiModal 
                        prompt={selectedPrompt} 
                        onClose={handleCloseModal}
                        systemInstruction={aiSupervisorInstruction}
                      />
            )}
             <ConfigPanel 
                isOpen={isConfigPanelOpen}
                onClose={() => setIsConfigPanelOpen(false)}
                systemOrchestratorInstruction={systemOrchestratorInstruction}
                setSystemOrchestratorInstruction={setSystemOrchestratorInstruction}
                aiSupervisorInstruction={aiSupervisorInstruction}
                setAiSupervisorInstruction={setAiSupervisorInstruction}
            />
        </div>
    );
};

export default App;