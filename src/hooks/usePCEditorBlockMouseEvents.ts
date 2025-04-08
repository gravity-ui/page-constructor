import * as React from 'react';

import _ from 'lodash';

import {getCursorPositionOverElement} from '../utils/editor';

import {sendEventPostMessage} from './usePostMessageAPI';

const usePCEditorBlockMouseEvents = (arrayIndex: number[], element?: HTMLElement) => {
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
                sendEventPostMessage('ON_CLICK_BLOCK', {path: arrayIndex});
            }
        },
        [arrayIndex, element],
    );

    return {
        onClick,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
    };
};

export default usePCEditorBlockMouseEvents;
