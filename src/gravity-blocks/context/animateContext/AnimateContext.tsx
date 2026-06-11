import * as React from 'react';

export interface AnimateContextProps {
    animated?: boolean;
}

export const AnimateContext = React.createContext<AnimateContextProps>({animated: true});
