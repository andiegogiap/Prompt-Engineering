import React from 'react';
import { workflowData } from '../constants';
import { WorkflowStep } from '../types';
import { ArrowRightIcon, CheckCircleIcon, ClockIcon, CpuIcon } from './icons';

interface WorkflowModalProps {
  onClose: () => void;
}

const AgentCard: React.FC<{ step: WorkflowStep }> = ({ step }) => (
    <div className="bg-muted/80 backdrop-blur-sm rounded-lg p-4 w-72 h-full flex flex-col flex-shrink-0 shadow-lg border border-border/50">
        <div className="flex items-center gap-3 mb-3">
            <CpuIcon className="w-6 h-6 text-neon-green" />
            <h3 className="text-lg font-bold text-foreground font-display">{step.agent}</h3>
        </div>
        <div className="flex-grow space-y-3 text-sm">
            <div>
                <p className="font-semibold text-muted-foreground">Command</p>
                <code className="text-xs bg-black/50 p-1 rounded-md inline-block text-neon-green">{step.command}</code>
            </div>
            <div>
                <p className="font-semibold text-muted-foreground">Input</p>
                <pre className="text-xs bg-black/50 p-2 rounded-md overflow-x-auto text-foreground"><code>{JSON.stringify(step.input, null, 2)}</code></pre>
            </div>
             <div>
                <p className="font-semibold text-muted-foreground">Instructions</p>
                <blockquote className="border-l-4 border-neon-green/50 pl-3 text-muted-foreground italic text-xs">{step.instructions}</blockquote>
            </div>
        </div>
    </div>
);


export const WorkflowModal: React.FC<WorkflowModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative flex flex-col w-full max-w-6xl max-h-[90vh] text-card-foreground mx-4 glass neon" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-4">
                 <h2 className="text-2xl font-bold font-display">{workflowData.name}</h2>
                 {workflowData.tracking && (
                     <span className="flex items-center gap-1.5 bg-green-500/20 text-neon-green text-xs font-medium px-2.5 py-0.5 rounded-full border border-neon-green/50">
                         <CheckCircleIcon className="w-4 h-4" />
                         Tracking Enabled
                     </span>
                 )}
            </div>
          <button onClick={onClose} className="text-2xl p-1 rounded-full hover:bg-white/10 leading-none">&times;</button>
        </header>

        <div className="flex-1 p-6 overflow-auto space-y-6">
            <div className="bg-muted/80 p-3 rounded-lg flex items-center gap-3 w-fit border border-border/50">
                <ClockIcon className="w-5 h-5 text-muted-foreground" />
                <div>
                    <p className="font-semibold text-sm font-display">Schedule</p>
                    <p className="text-xs text-muted-foreground">{workflowData.schedule.trigger.type}: <code className="bg-black/50 p-1 rounded-md text-neon-blue">{workflowData.schedule.trigger.expression}</code></p>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3 font-display">Steps</h3>
                <div className="bg-background/50 rounded-lg border border-border/30">
                    <div className="flex items-stretch gap-4 p-4 overflow-x-auto">
                        {workflowData.steps.map((step, index) => (
                            <React.Fragment key={step.agent}>
                                <AgentCard step={step} />
                                {index < workflowData.steps.length - 1 && (
                                    <div className="flex items-center justify-center px-2">
                                        <ArrowRightIcon className="w-8 h-8 text-neon-blue/50" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};