import * as React from 'react';

import {BlockIdContext} from '../context/blockIdContext';

import usePCEditorBlockMouseEvents from './usePCEditorBlockMouseEvents';
import usePCEditorBlockSelection from './usePCEditorBlockSelection';

export function usePCEditorItemWrap(index = 0) {
    const [element, setElement] = React.useState<HTMLElement | undefined>();

    const blockRef = React.useCallback((node: HTMLElement | null) => {
        if (node !== null) {
            setElement(node);
        }
    }, []);

    const parentBlockId = React.useContext(BlockIdContext);
    const adminBlockMouseEvents = usePCEditorBlockMouseEvents([...parentBlockId, index], element);
    usePCEditorBlockSelection([...parentBlockId, index], element);

    return {adminBlockMouseEvents, blockRef};
}
