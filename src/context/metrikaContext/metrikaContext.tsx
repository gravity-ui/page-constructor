import React from 'react';

export interface MetrikaContextProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metrika?: any;
}

export const MetrikaContext = React.createContext<MetrikaContextProps>({});
