import * as React from 'react';

import type {Content} from '../form-generator-v2/types';

interface CanvasContentContextType {
    content: Content;
    setContent: React.Dispatch<React.SetStateAction<Content>>;
    templateContent: Content;
    setTemplateContent: React.Dispatch<React.SetStateAction<Content>>;
}

const CanvasContentContext = React.createContext<CanvasContentContextType | null>(null);

interface CanvasContentProviderProps {
    content: Content;
    setContent: React.Dispatch<React.SetStateAction<Content>>;
    templateContent: Content;
    setTemplateContent: React.Dispatch<React.SetStateAction<Content>>;
    children: React.ReactNode;
}

export const CanvasContentProvider = ({
    content,
    setContent,
    templateContent,
    setTemplateContent,
    children,
}: CanvasContentProviderProps) => {
    const value = React.useMemo<CanvasContentContextType>(
        () => ({content, setContent, templateContent, setTemplateContent}),
        [content, setContent, templateContent, setTemplateContent],
    );
    return <CanvasContentContext.Provider value={value}>{children}</CanvasContentContext.Provider>;
};

export const useCanvasContent = (): CanvasContentContextType => {
    const context = React.useContext(CanvasContentContext);
    if (!context) {
        throw new Error('useCanvasContent must be used within a CanvasContentProvider');
    }
    return context;
};
