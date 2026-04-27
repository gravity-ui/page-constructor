import * as React from 'react';

export interface MicrodataContextProps {
    contentUpdatedDate?: string;
}

export const MicrodataContext = React.createContext<MicrodataContextProps>({});
