
import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        marked: any;
    }
}

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current && window.marked) {
            // In a real-world app, you should sanitize the HTML to prevent XSS attacks.
            // Libraries like DOMPurify are great for this.
            // For this example, we trust the output from the Gemini API.
            contentRef.current.innerHTML = window.marked.parse(content);
        }
    }, [content]);

    return <div ref={contentRef} className="prose dark:prose-invert max-w-none prose-p:my-2 prose-pre:bg-black/5 dark:prose-pre:bg-white/5 prose-pre:p-2 prose-pre:rounded-md" />;
};
