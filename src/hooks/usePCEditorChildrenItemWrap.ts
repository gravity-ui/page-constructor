import * as React from 'react';

import {BlockIdContext} from '../context/blockIdContext';

import {usePCEditorBlockRegister} from './usePCEditorBlockRegister';

export function usePCEditorChildrenItemWrap(index = 0) {
    const parentBlockId = React.useContext(BlockIdContext);
    const path = React.useMemo(() => [...parentBlockId, index], [parentBlockId, index]);
    const blockRef = usePCEditorBlockRegister(path);

    return {blockRef, path};
}
