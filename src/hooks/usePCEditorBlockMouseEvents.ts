import * as React from 'react';

import _ from 'lodash';

import {getCursorPositionOverElement} from '../utils/editor';

import {usePCEditorStore} from './usePCEditorStore';
import {sendEventPostMessage, useInternalPostMessageAPIListener} from './usePostMessageAPI';

const usePCEditorBlockMouseEvents = (arrayIndex: number[], element?: HTMLElement) => {
    const {selectedBlock} = usePCEditorStore();

    const onMouseUp = React.useCallback(
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

    const onMouseMove = React.useCallback(
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

    const onMouseLeave = React.useCallback(() => {
        if (element) {
            const rect = element.getClientRects().item(0);
            if (rect) {
                sendEventPostMessage('ON_HOVER_BLOCK', {});
            }
        }
    }, [element]);

    const onClick = React.useCallback(
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

    const onResize = React.useCallback(() => {
        if (element && _.isEqual(selectedBlock, arrayIndex)) {
            const rect = element.getClientRects().item(0);
            if (rect) {
                sendEventPostMessage('ON_RESIZE_BLOCK', {rect});
            }
        }
    }, [arrayIndex, element, selectedBlock]);

    React.useEffect(() => {
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [element, onResize]);

    // Listen for the UPDATE_SELECTED_BLOCK action and handle it directly
    const handleUpdateSelectedBlock = React.useCallback(
        (data: {path?: number[]}) => {
            if (data && data.path && Array.isArray(data.path) && _.isEqual(data.path, arrayIndex)) {
                // Only proceed if the path matches arrayIndex
                if (element) {
                    const rect = element.getClientRects().item(0);
                    if (rect) {
                        sendEventPostMessage('ON_UPDATE_SELECTED_BLOCK', {rect, path: arrayIndex});
                    }
                }
            }
        },
        [arrayIndex, element],
    );

    useInternalPostMessageAPIListener('UPDATE_SELECTED_BLOCK', handleUpdateSelectedBlock);

    return {
        onClick,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
    };
};

export default usePCEditorBlockMouseEvents;
