import * as React from 'react';

const isRscServer = typeof React.createContext !== 'function';

export const MobileContext = (
    isRscServer ? null : React.createContext<boolean>(false)
) as React.Context<boolean>;
