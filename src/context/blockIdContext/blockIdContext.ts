import React from 'react';

export type BlockIdContextProp = number;

export const BlockIdContext = React.createContext<BlockIdContextProp>(NaN);
