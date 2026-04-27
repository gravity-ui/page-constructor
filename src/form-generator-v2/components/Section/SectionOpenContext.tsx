import * as React from 'react';

export interface SectionContextValue {
    isOpen: boolean;
    nestingLevel: number;
}

export const SectionOpenContext = React.createContext<SectionContextValue>({
    isOpen: false,
    nestingLevel: 0,
});
