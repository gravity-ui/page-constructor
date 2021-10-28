import React from 'react';
export interface SSRContextProps {
    isServer?: boolean;
}

export const SSRContext = React.createContext<SSRContextProps>({});
