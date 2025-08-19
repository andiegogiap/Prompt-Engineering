
import { ReactNode } from 'react';

export interface PromptCategory {
    subject: string;
    prompt_description: string;
    category: string;
    icon: ReactNode;
    color: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface WorkflowStep {
    agent: string;
    command: string;
    input: { [key: string]: string };
    instructions: string;
    next?: string;
}

export interface Workflow {
    name: string;
    schedule: {
        trigger: {
            type: string;
            expression: string;
        };
    };
    steps: WorkflowStep[];
    tracking: boolean;
}

export interface InferenceCard {
    title: string;
    content: string;
}

export interface InferenceData {
    summary: string;
    handoverNotes: string;
    cards: InferenceCard[];
    visualisation: string;
    rawSyntax: string;
    timestamp: string;
}