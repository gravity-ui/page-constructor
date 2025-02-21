import React, {useCallback, useEffect} from 'react';

import _ from 'lodash';

import {getCursorPositionOverElement} from '../utils/editor';

import {usePCEditorStore} from './usePCEditorStore';
import {sendEventPostMessage} from './usePostMessageAPI';

const usePCEditorBlockMouseEvents = (arrayIndex: number[], element?: HTMLElement) => {
    const {selectedBlock} = usePCEditorStore();

    const onMouseUp = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (element) {
                const rect = element.getClientRects().item(0);
                if (rect) {
                    const position = getCursorPositionOverElement(rect, e);
                    sendEventPostMessage('ON_MOUSE_UP', {path: arrayIndex, rect, position});
                }
            }
        },
        [arrayIndex, element],
    );

    const onMouseMove = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (element) {
                const rect = element.getClientRects().item(0);
                if (rect) {
                    const position = getCursorPositionOverElement(rect, e);
                    sendEventPostMessage('ON_HOVER_BLOCK', {rect, position});
                }
            }
        },
        [element],
    );

    const onMouseLeave = useCallback(() => {
        if (element) {
            const rect = element.getClientRects().item(0);
            if (rect) {
                sendEventPostMessage('ON_HOVER_BLOCK', {});
            }
        }
    }, [element]);

    const onClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (element) {
                const rect = element.getClientRects().item(0);
                if (rect) {
                    sendEventPostMessage('ON_CLICK_BLOCK', {rect, path: arrayIndex});
                }
            }
        },
        [arrayIndex, element],
    );

    const onResize = useCallback(() => {
        if (element && _.isEqual(selectedBlock, arrayIndex)) {
            const rect = element.getClientRects().item(0);
            if (rect) {
                sendEventPostMessage('ON_RESIZE_BLOCK', {rect});
            }
        }
    }, [arrayIndex, element, selectedBlock]);

    useEffect(() => {
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [element, onResize]);

    return {
        onClick,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
    };
};

export default usePCEditorBlockMouseEvents;
