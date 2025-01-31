import * as React from 'react';

export type BlockIdContextProp = string;

export const BlockIdContext = React.createContext<BlockIdContextProp>('');
