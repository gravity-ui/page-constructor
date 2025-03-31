import * as React from 'react';
import {editorCn} from '../../utils/cn';

import './DragContext.scss';

const b = editorCn('preview');

export interface DragItem {
    path: number[];
    type: string;
    treeTitle?: string;
}

// Context for drag and drop operations
export const DragContext = React.createContext<{
    draggedItem: DragItem | null;
    setDraggedItem: React.Dispatch<React.SetStateAction<DragItem | null>>;
    previewRef: React.RefObject<HTMLDivElement>;
    showPreview: (rect: DOMRect, item: DragItem) => void;
    hidePreview: () => void;
}>({
    draggedItem: null,
    setDraggedItem: () => {},
    previewRef: {current: null},
    showPreview: () => {},
    hidePreview: () => {},
});

// Component for the drag preview
const DragPreview = React.forwardRef<HTMLDivElement>((_, ref) => {
    return <div ref={ref} className={b()} style={{display: 'none'}} />;
});

// Provider component for drag context
export const DragContextProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [draggedItem, setDraggedItem] = React.useState<DragItem | null>(null);
    const previewRef = React.useRef<HTMLDivElement>(null);

    const showPreview = React.useCallback((rect: DOMRect, item: DragItem) => {
        if (!previewRef.current) return;

        const previewEl = previewRef.current;
        previewEl.style.display = 'block';
        previewEl.style.width = `${rect.width}px`;
        previewEl.style.top = `${rect.bottom}px`;
        previewEl.style.left = `${rect.left}px`;

        previewEl.innerHTML = `
            <div class="${b('content')}">
                <div class="${b('type')}">${item.type}</div>
                ${item.treeTitle ? `<div class="${b('title')}">${item.treeTitle}</div>` : ''}
            </div>
        `;
    }, []);

    const hidePreview = React.useCallback(() => {
        if (previewRef.current) {
            previewRef.current.style.display = 'none';
        }
    }, []);

    return (
        <DragContext.Provider
            value={{draggedItem, setDraggedItem, previewRef, showPreview, hidePreview}}
        >
            {children}
            <DragPreview ref={previewRef} />
        </DragContext.Provider>
    );
};
