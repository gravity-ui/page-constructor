import * as React from 'react';
import _ from 'lodash';

import {usePCEditorStore} from './usePCEditorStore';
import {sendEventPostMessage} from './usePostMessageAPI';

const usePCEditorBlockSelection = (arrayIndex: number[], element?: HTMLElement) => {
    const {selectedBlock} = usePCEditorStore();

    const onResize = React.useCallback(() => {
        if (element && _.isEqual(selectedBlock, arrayIndex)) {
            const rect = element.getClientRects().item(0);
            if (rect) {
                sendEventPostMessage('ON_UPDATE_BLOCK_SELECTION', {rect});
            }
        }
    }, [arrayIndex, element, selectedBlock]);

    React.useEffect(() => {
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [element, onResize]);

    // Update blockBorders when selectedBlock changes
    React.useEffect(() => {
        onResize();
    }, [onResize]);
};

export default usePCEditorBlockSelection;
