import React from 'react';
export interface StylesContextProps {
    isServer?: boolean;
    hostname?: string;
}

export const SSRContext = React.createContext<StylesContextProps>({});
