import * as React from 'react';

import {BlockData} from '../../constructor-items';

export type BlocksContextProps = {
    blocks: Array<BlockData>;
};

export const BlocksContext = React.createContext<BlocksContextProps>({blocks: []});
