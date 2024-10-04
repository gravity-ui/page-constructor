import React, {useCallback, useContext} from 'react';

import {EditorContext, useEditorStore} from '../../../../../context/editorContext';
import {useMessageSender} from '../../../../../context/messagesContext/hooks/useMessageSender';
import {ActionTypes} from '../../../../../types/actions';
import {getCursorPositionOverElement} from '../../../../../utils/editor';

const useEditorBlockMouseEvents = (arrayIndex: number[]) => {
    const sendMessage = useMessageSender();
    const {manipulateOverlayMode} = useEditorStore();
    const {setActiveElement} = useContext(EditorContext);

    const onMouseUp = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            if (manipulateOverlayMode) {
                const rect = event.currentTarget.getClientRects().item(0);
                if (rect) {
                    const position = getCursorPositionOverElement(rect, event);

                    let newLastIndex = arrayIndex[arrayIndex.length - 1];

                    if (position === 'right' || position === 'bottom') {
                        newLastIndex += 1;
                    }

                    const newArrayIndex = [
                        ...arrayIndex.slice(0, arrayIndex.length - 1),
                        newLastIndex,
                    ];

                    if (manipulateOverlayMode === 'insert') {
                        sendMessage({
                            type: ActionTypes.InsertBlock,
                            payload: {
                                path: newArrayIndex,
                            },
                        });
                    } else if (manipulateOverlayMode === 'reorder') {
                        sendMessage({
                            type: ActionTypes.ReorderBlocks,
                            payload: {
                                path: newArrayIndex,
                            },
                        });
                    }
                }
            }
        },
        [arrayIndex, manipulateOverlayMode, sendMessage],
    );

    const onMouseMove = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            if (manipulateOverlayMode) {
                const rect = event.currentTarget.getClientRects().item(0);
                if (rect) {
                    const cursorPosition = getCursorPositionOverElement(rect, event);
                    sendMessage({
                        type: ActionTypes.OverlayModeOnMove,
                        payload: {
                            block: {rect, cursorPosition},
                            cursor: {
                                x: event.clientX,
                                y: event.clientY,
                            },
                        },
                    });
                }
            }
        },
        [manipulateOverlayMode, sendMessage],
    );

    const onMouseLeave = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            if (manipulateOverlayMode) {
                const rect = e.currentTarget.getClientRects().item(0);
                if (rect) {
                    sendMessage({
                        type: ActionTypes.OverlayModeOnMove,
                        payload: {
                            cursor: {
                                x: e.clientX,
                                y: e.clientY,
                            },
                        },
                    });
                }
            } else {
            }
        },
        [manipulateOverlayMode, sendMessage],
    );

    const onClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            if (!manipulateOverlayMode) {
                const element = e.currentTarget;
                const rect = element.getClientRects().item(0);
                if (rect) {
                    setActiveElement(element);

                    sendMessage({
                        type: ActionTypes.SelectBlock,
                        payload: {
                            path: arrayIndex,
                            rect: rect,
                        },
                    });
                }
            }
        },
        [arrayIndex, manipulateOverlayMode, sendMessage, setActiveElement],
    );

    return {
        onClick,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
    };
};

export default useEditorBlockMouseEvents;
