
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PromptCategory, ChatMessage, InferenceData } from '../types';
import { geminiService } from '../services/geminiService';
import { Chat } from '@google/genai';
import { MarkdownRenderer } from './MarkdownRenderer';
import { CopyIcon, CheckIcon, PieChartIcon, UploadCloudIcon, ClipboardSignatureIcon } from './icons';

interface AiModalProps {
  prompt: PromptCategory;
  onClose: () => void;
  systemInstruction: string;
}

const TabButton: React.FC<{ name: string; activeTab: string; onClick: () => void; disabled?: boolean; }> = ({ name, activeTab, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed relative ${
            activeTab.toLowerCase() === name.toLowerCase()
                ? 'text-neon-pink'
                : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-selected={activeTab.toLowerCase() === name.toLowerCase()}
        role="tab"
    >
        {name}
        {activeTab.toLowerCase() === name.toLowerCase() && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-pink rounded-full"/>
        )}
    </button>
);

export const AiModal: React.FC<AiModalProps> = ({ prompt, onClose, systemInstruction }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});
  const [latestCopied, setLatestCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'infographic' | 'inference'>('chat');
  const [infographicSvg, setInfographicSvg] = useState<string | null>(null);
  const [isGeneratingInfographic, setIsGeneratingInfographic] = useState(false);

  const [inferenceData, setInferenceData] = useState<InferenceData | null>(null);
  const [isGeneratingInference, setIsGeneratingInference] = useState(false);
  const [inferenceViewMode, setInferenceViewMode] = useState<'preview' | 'raw'>('preview');
  const [isPosting, setIsPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [rawInferenceCopied, setRawInferenceCopied] = useState(false);

  
  const chatSession = useRef<Chat | null>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      setIsLoading(true);
      setMessages([]);
      chatSession.current = geminiService.startChat(systemInstruction);
      
      const initialPrompt = `Generate an initial detailed and creative prompt for a "${prompt.subject}" focusing on: ${prompt.prompt_description}. Also, provide some iterative contextual nuances or follow-up questions to refine this prompt.`;

      try {
        const stream = await chatSession.current.sendMessageStream({ message: initialPrompt });
        
        let text = '';
        setMessages([{ role: 'model', text: '' }]);

        for await (const chunk of stream) {
          text += chunk.text;
          setMessages([{ role: 'model', text }]);
        }

      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages([{ role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [prompt, systemInstruction]);

  useEffect(() => {
    if (contentAreaRef.current) {
        contentAreaRef.current.scrollTop = contentAreaRef.current.scrollHeight;
    }
  }, [messages, activeTab, infographicSvg, inferenceData]);
  
  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading || !chatSession.current) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await chatSession.current.sendMessageStream({ message: input });

      let text = '';
      for await (const chunk of stream) {
        text += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', text };
            return newMessages;
        });
      }

    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { role: 'model', text: 'Sorry, something went wrong.' };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);
  
  const copyToClipboard = (text: string, onCopySuccess: () => void) => {
    navigator.clipboard.writeText(text).then(() => {
        onCopySuccess();
        setTimeout(() => {
            setCopiedStates({});
            setLatestCopied(false);
            setRawInferenceCopied(false);
        }, 2000);
    }).catch(err => console.error('Failed to copy text: ', err));
  };
  
  const handleCopyMessage = (text: string, index: number) => {
      copyToClipboard(text, () => setCopiedStates({ [index]: true }));
  };

  const handleCopyLatest = () => {
    const lastModelMessage = [...messages].reverse().find(m => m.role === 'model');
    if (lastModelMessage) {
        copyToClipboard(lastModelMessage.text, () => setLatestCopied(true));
    }
  };

  const handleCopyRawInference = () => {
    if (inferenceData?.rawSyntax) {
        copyToClipboard(inferenceData.rawSyntax, () => setRawInferenceCopied(true));
    }
  }

  const handleGenerateSummarySvg = async () => {
    if (isLoading || isGeneratingInfographic || messages.length === 0) return;

    setIsGeneratingInfographic(true);
    
    const conversationHistory = messages.map(msg => `${msg.role}: ${msg.text}`).join('\n---\n');
    const infographicPrompt = `Based on the following conversation, create a visually appealing and informative infographic as a self-contained SVG. The infographic should summarize the key points and relationships. The SVG must be well-formed XML, include styles within a <style> tag, and be ready to be embedded directly into an HTML page. Conversation:\n\n${conversationHistory}`;

    try {
        const svgContent = await geminiService.generateSvgContent(infographicPrompt);
        setInfographicSvg(svgContent);
        setActiveTab('infographic');
    } catch(error) {
        console.error("Failed to generate infographic:", error);
        setInfographicSvg(`<svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg"><text x="10" y="20" font-family="sans-serif" font-size="16" fill="red">Sorry, an error occurred while generating the infographic.</text></svg>`);
        setActiveTab('infographic');
    } finally {
        setIsGeneratingInfographic(false);
    }
  };

  const handleGenerateInference = async () => {
      if (isLoading || isGeneratingInference || messages.length === 0) return;
      setIsGeneratingInference(true);
      try {
        const conversationHistory = messages.map(msg => `${msg.role}: ${msg.text}`).join('\n---\n');
        const result = await geminiService.generateInference(conversationHistory);
        setInferenceData({
            ...result,
            rawSyntax: JSON.stringify(result, null, 2),
            timestamp: new Date().toISOString(),
        });
        setActiveTab('inference');
      } catch(error) {
        console.error("Failed to generate inference:", error);
        // You could set some error state here to show in the UI
      } finally {
        setIsGeneratingInference(false);
      }
  };

  const handlePostToApi = async () => {
    if (!inferenceData) return;
    setIsPosting(true);
    setPostSuccess(false);
    // Simulate API call
    console.log("Posting to API Gateway:", inferenceData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsPosting(false);
    setPostSuccess(true);
    setTimeout(() => setPostSuccess(false), 3000);
  };

  const anyLoading = isLoading || isGeneratingInfographic || isGeneratingInference || isPosting;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative flex flex-col w-full max-w-4xl max-h-[90vh] bg-background/80 backdrop-blur-lg text-card-foreground rounded-lg shadow-2xl mx-4 border border-neon-purple/50 shadow-neon-purple/20" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-neon-purple/30">
          <h2 className="text-xl font-bold font-display">Prompt Builder for "{prompt.subject}"</h2>
          <button onClick={onClose} className="p-1 rounded-full text-2xl leading-none hover:bg-accent">&times;</button>
        </header>

        <div className="flex border-b border-neon-purple/30 px-4" role="tablist">
          <TabButton name="Chat" activeTab={activeTab} onClick={() => setActiveTab('chat')} />
          <TabButton name="Infographic" activeTab={activeTab} onClick={() => setActiveTab('infographic')} disabled={!infographicSvg} />
          <TabButton name="Inference" activeTab={activeTab} onClick={() => setActiveTab('inference')} disabled={!inferenceData} />
        </div>
        
        <div ref={contentAreaRef} className="flex-1 p-4 overflow-y-auto" role="tabpanel">
           {activeTab === 'chat' && (
              <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 text-sm ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && 
                            <div className="w-8 h-8 rounded-full bg-neon-purple/20 border border-neon-purple flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-sm font-bold text-neon-purple font-display">AI</span>
                            </div>
                        }
                        <div className={`group relative max-w-2xl p-3 rounded-lg ${msg.role === 'user' ? 'bg-neon-blue text-black' : 'bg-muted'}`}>
                            <MarkdownRenderer content={msg.text} />
                            <button onClick={() => handleCopyMessage(msg.text, index)} className="absolute top-1 right-1 p-1 text-xs rounded hover:bg-black/20 dark:hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                                {copiedStates[index] ? <CheckIcon className="text-neon-green"/> : <CopyIcon className="text-current"/>}
                            </button>
                        </div>
                    </div>
                  ))}
                  {isLoading && messages.length > 0 && messages[messages.length-1].role === 'model' && <div className="text-center text-muted-foreground italic">AI is thinking...</div>}
              </div>
            )}
            {activeTab === 'infographic' && (
                <div className="p-4 bg-background rounded-lg flex items-center justify-center h-full border border-border">
                    {infographicSvg ? (
                        <div dangerouslySetInnerHTML={{ __html: infographicSvg }} className="w-full h-full" />
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <p>No infographic generated yet.</p>
                            <p className="text-sm">Click the "Generate Summary SVG" button below to create one.</p>
                        </div>
                    )}
                </div>
            )}
             {activeTab === 'inference' && (
                <div className="space-y-4">
                    {inferenceData ? (
                        <>
                            <div className="flex justify-end">
                                <div className="inline-flex rounded-md shadow-sm bg-muted p-1">
                                    <button onClick={() => setInferenceViewMode('preview')} className={`px-3 py-1 text-sm font-medium rounded-md ${inferenceViewMode === 'preview' ? 'bg-neon-blue text-black' : 'text-muted-foreground hover:bg-accent'}`}>Preview</button>
                                    <button onClick={() => setInferenceViewMode('raw')} className={`px-3 py-1 text-sm font-medium rounded-md ${inferenceViewMode === 'raw' ? 'bg-neon-blue text-black' : 'text-muted-foreground hover:bg-accent'}`}>Raw Syntax</button>
                                </div>
                            </div>

                            {inferenceViewMode === 'preview' ? (
                                <div className="space-y-6">
                                    <div className="p-4 rounded-lg bg-muted border border-border">
                                        <h3 className="font-display text-lg font-bold text-neon-purple">Handover Notes</h3>
                                        <p className="text-xs text-muted-foreground mb-2">Generated on: {new Date(inferenceData.timestamp).toLocaleString()}</p>
                                        <p className="text-sm italic border-l-4 border-neon-purple/50 pl-3">{inferenceData.handoverNotes}</p>
                                        <h4 className="font-display text-md font-bold mt-3 text-neon-blue">Summary</h4>
                                        <p className="text-sm">{inferenceData.summary}</p>
                                    </div>
                                    <div className="p-4 bg-background rounded-lg flex items-center justify-center h-full border border-border">
                                        <div dangerouslySetInnerHTML={{ __html: inferenceData.visualisation }} className="w-full h-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-neon-green mb-3">Insight Cards</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                            {inferenceData.cards.map((card, idx) => (
                                                <div key={idx} className="bg-muted p-3 rounded-lg border border-border/50">
                                                    <h4 className="font-bold text-foreground truncate">{card.title}</h4>
                                                    <p className="text-xs text-muted-foreground">{card.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <pre className="bg-black/50 text-xs text-foreground p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-all">
                                        <code>{inferenceData.rawSyntax}</code>
                                    </pre>
                                    <button onClick={handleCopyRawInference} className="absolute top-2 right-2 p-2 rounded-md bg-white/10 hover:bg-white/20">
                                      {rawInferenceCopied ? <CheckIcon className="text-neon-green"/> : <CopyIcon className="w-4 h-4" />}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center text-muted-foreground py-10">
                            <p>No inference data generated yet.</p>
                            <p className="text-sm">Click the "Generate Inference" button below to create one.</p>
                        </div>
                    )}
                </div>
             )}
        </div>
        
        <footer className="p-4 border-t border-neon-purple/30">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !anyLoading && handleSend()}
              placeholder="Type your refinement or question..."
              className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              disabled={anyLoading}
            />
            <button onClick={handleSend} disabled={anyLoading || !input.trim()} className="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-neon-blue text-black hover:bg-neon-blue/90 h-10 px-4 py-2 shadow-md hover:shadow-lg hover:shadow-neon-blue/50">
              Send
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            {activeTab === 'chat' && <>
                <button onClick={handleCopyLatest} disabled={anyLoading} className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent h-10 px-4 py-2">
                  {latestCopied ? 'Copied!' : 'Copy Latest Prompt'}
                </button>
                <button onClick={handleGenerateSummarySvg} disabled={anyLoading || messages.length === 0} className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent h-10 px-4 py-2 disabled:opacity-75">
                  {isGeneratingInfographic ? "Generating..." : <><PieChartIcon className="mr-2 h-4 w-4 text-neon-green" /> Summary SVG</>}
                </button>
                <button onClick={handleGenerateInference} disabled={anyLoading || messages.length === 0} className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent h-10 px-4 py-2 disabled:opacity-75">
                  {isGeneratingInference ? "Generating..." : <><ClipboardSignatureIcon className="mr-2 h-4 w-4 text-neon-purple" /> Generate Inference</>}
                </button>
            </>}
            {activeTab === 'inference' && inferenceData && <>
              <div className="col-span-2"></div>
              <button onClick={handlePostToApi} disabled={anyLoading} className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent h-10 px-4 py-2 disabled:opacity-75">
                {isPosting ? 'Posting...' : postSuccess ? 'Success!' : <><UploadCloudIcon className="mr-2 h-4 w-4 text-neon-blue"/> Post to API</> }
              </button>
            </>}

          </div>
        </footer>
      </div>
    </div>
  );
};
