import React from 'react';
export interface StylesContextProps {
    setStyles: (newValues: Record<string, string>) => void;
    pricesDetailedDescriptionHeight?: string;
}

export const StylesContext = React.createContext<StylesContextProps>({setStyles: () => {}});
