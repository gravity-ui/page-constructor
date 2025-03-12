import {useCallback, useContext, useState} from 'react';

import {BlockIdContext} from '../context/blockIdContext';

import usePCEditorBlockMouseEvents from './usePCEditorBlockMouseEvents';

export function usePCEditorItemWrap(index = 0) {
    const [element, setElement] = useState<HTMLElement | undefined>();

    const blockRef = useCallback((node: HTMLElement | null) => {
        if (node !== null) {
            setElement(node);
        }
    }, []);

    const parentBlockId = useContext(BlockIdContext);
    const adminBlockMouseEvents = usePCEditorBlockMouseEvents([...parentBlockId, index], element);

    return {adminBlockMouseEvents, blockRef};
}
