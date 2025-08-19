
import React from 'react';
import { PromptCategory, Workflow } from './types';
import { AccessibilityIcon, BriefcaseIcon, CheckSquareIcon, CodeXmlIcon, DollarSignIcon, LayoutGridIcon, LifeBuoyIcon, LineChartIcon, LockIcon, MegaphoneIcon, MessageCircleIcon, PenToolIcon, Share2Icon, ShoppingBagIcon, TerminalIcon, TrendingUpIcon, WorkflowIcon } from './components/icons';

export const promptCategories: PromptCategory[] = [
    {
        subject: "Marketing Campaign",
        prompt_description: "Generate creative and effective prompts for various marketing campaigns, including social media, email, and content marketing.",
        category: "Marketing",
        icon: React.createElement(MegaphoneIcon),
        color: "#FF00FF"
    },
    {
        subject: "Productivity Tools",
        prompt_description: "Craft prompts to optimize your use of productivity tools, such as task managers, note-taking apps, and calendar organizers.",
        category: "Productivity",
        icon: React.createElement(CheckSquareIcon),
        color: "#00FF7F"
    },
    {
        subject: "E-commerce Product Description",
        prompt_description: "Develop compelling prompts for generating engaging and SEO-friendly product descriptions for your online store.",
        category: "E-commerce",
        icon: React.createElement(ShoppingBagIcon),
        color: "#FFD700"
    },
    {
        subject: "Financial Analysis",
        prompt_description: "Create prompts for analyzing financial data, generating reports, and gaining insights into market trends and investments.",
        category: "Finance",
        icon: React.createElement(LineChartIcon),
        color: "#FFFF00"
    },
    {
        subject: "Cloud Security Best Practices",
        prompt_description: "Formulate prompts to understand and implement best practices for cloud security, data protection, and access management.",
        category: "Security",
        icon: React.createElement(LockIcon),
        color: "#00BFFF"
    },
    {
        subject: "Sales Pitch Generation",
        prompt_description: "Develop prompts for creating compelling sales pitches, handling objections, and closing deals effectively.",
        category: "Sales",
        icon: React.createElement(DollarSignIcon),
        color: "#39FF14"
    },
    {
        subject: "Data Analytics Insights",
        prompt_description: "Generate prompts for extracting meaningful insights from data, identifying trends, and making data-driven decisions.",
        category: "Analytics",
        icon: React.createElement(TrendingUpIcon),
        color: "#00FFFF"
    },
    {
        subject: "Communication Strategies",
        prompt_description: "Craft prompts for improving communication strategies, writing clear messages, and fostering effective team collaboration.",
        category: "Communication",
        icon: React.createElement(MessageCircleIcon),
        color: "#FF00FF"
    },
    {
        subject: "UI/UX Design Development",
        prompt_description: "Generate prompts for developing complete UI/UX designs, from wireframing and prototyping to high-fidelity mockups and user testing.",
        category: "Design",
        icon: React.createElement(PenToolIcon),
        color: "#BF00FF"
    },
    {
        subject: "CSS Layouts",
        prompt_description: "Craft prompts to generate complex, responsive CSS layouts using Flexbox & Grid, and troubleshoot common layout issues.",
        category: "Design",
        icon: React.createElement(LayoutGridIcon),
        color: "#DA70D6"
    },
    {
        subject: "Software Development Queries",
        prompt_description: "Generate prompts for debugging code, writing functions, and understanding complex programming concepts.",
        category: "Development",
        icon: React.createElement(TerminalIcon),
        color: "#7FFF00"
    },
    {
        subject: "React Component Generation",
        prompt_description: "Generate prompts for creating reusable React components with specific props and state management using hooks.",
        category: "Development",
        icon: React.createElement(CodeXmlIcon),
        color: "#00FFFF"
    },
    {
        subject: "API Integration",
        prompt_description: "Develop prompts for fetching data from a REST/GraphQL API, handling states (loading, error), and displaying it in a web app.",
        category: "Development",
        icon: React.createElement(CodeXmlIcon),
        color: "#1E90FF"
    },
    {
        subject: "Web Accessibility (A11y)",
        prompt_description: "Formulate prompts to audit HTML, find & fix WCAG issues, and improve keyboard navigation and screen reader support.",
        category: "Development",
        icon: React.createElement(AccessibilityIcon),
        color: "#8A2BE2"
    },
    {
        subject: "Workflow Visualization",
        prompt_description: "Parse a YAML-like workflow definition and display it as a clear, easy-to-understand visual graph.",
        category: "Development",
        icon: React.createElement(WorkflowIcon),
        color: "#9D00FF"
    },
    {
        subject: "Human Resources Policies",
        prompt_description: "Create prompts for drafting HR policies, employee handbooks, and managing talent acquisition processes.",
        category: "Human Resources",
        icon: React.createElement(BriefcaseIcon),
        color: "#FF69B4"
    },
    {
        subject: "Customer Support Responses",
        prompt_description: "Develop prompts for crafting empathetic and effective customer support responses, FAQs, and troubleshooting guides.",
        category: "Customer Support",
        icon: React.createElement(LifeBuoyIcon),
        color: "#FF4500"
    },
    {
        subject: "Social Media Content Ideas",
        prompt_description: "Generate prompts for brainstorming engaging social media content, captions, and strategies for various platforms.",
        category: "Social Media",
        icon: React.createElement(Share2Icon),
        color: "#00BFFF"
    },
    {
        subject: "Vite Project Configuration",
        prompt_description: "Generate prompts for setting up and configuring a Vite project, optimizing build performance, and integrating plugins.",
        category: "Development",
        icon: React.createElement(CodeXmlIcon),
        color: "#646CFF"
    },
    {
        subject: "Shadcn/ui Component Customization",
        prompt_description: "Create prompts for customizing shadcn/ui components, theming, and building complex UIs using its primitives.",
        category: "Development",
        icon: React.createElement(LayoutGridIcon),
        color: "#E0B0FF"
    },
    {
        subject: "Advanced React Hooks",
        prompt_description: "Generate prompts for understanding and implementing advanced React hooks like useReducer, useContext, and creating custom hooks.",
        category: "Development",
        icon: React.createElement(CodeXmlIcon),
        color: "#61DAFB"
    },
    {
        subject: "Node.js Backend API",
        prompt_description: "Generate prompts for building a Node.js Express API, connecting to a database, and implementing authentication middleware.",
        category: "Development",
        icon: React.createElement(TerminalIcon),
        color: "#39FF14"
    },
    {
        subject: "SPA Architecture",
        prompt_description: "Formulate prompts for designing the architecture of a Single Page Application, including routing, state management, and API communication.",
        category: "Development",
        icon: React.createElement(Share2Icon),
        color: "#F7DF1E"
    },
    {
        subject: "AI Family Orchestration",
        prompt_description: "Design a comprehensive orchestration and API integration plan for a multi-app AI ecosystem. This plan should enable seamless coordination, task handoffs, and feedback loops, leveraging tools like Gemini CLI and OpenAI for AI-driven orchestration and CI/CD automation.",
        category: "Development",
        icon: React.createElement(WorkflowIcon),
        color: "#9D00FF"
    }
];

export const workflowData: Workflow = {
  name: 'spec-generation',
  schedule: {
    trigger: {
      type: 'cron',
      expression: '0 9 * * 1',
    },
  },
  steps: [
    {
      agent: 'Lyra',
      command: 'ingest-source',
      input: {
        source_type: 'file',
        path: '/data/project_brief.txt',
      },
      instructions: 'Ingest the project brief file and prepare chunks for the spec pipeline.',
      next: 'Adam',
    },
    {
      agent: 'Adam',
      command: 'execute-job',
      input: {
        previous_output: '_brainstorm.md',
      },
      instructions: 'Convert brainstorm notes into structured JSON spec.',
      next: 'David',
    },
    {
      agent: 'David',
      command: 'execute-job',
      input: {
        previous_output: 'requirements.json',
      },
      instructions: 'Generate a human-readable summary of the requirements.',
      next: 'Andoy',
    },
    {
      agent: 'Andoy',
      command: 'execute-job',
      input: {
        previous_output: 'summary.txt',
      },
      instructions: 'Final step in the workflow.',
    },
  ],
  tracking: true,
};
