import {useCallback, useContext, useEffect} from 'react';

import {JSONSchemaType} from 'ajv';
import _ from 'lodash';

import {blockDataMap} from '../constructor-items';
import {EditorContext, useEditorStore} from '../context/editorContext';
import {useMessageObserver, useMessageSender} from '../context/messagesContext';
import {PageContent} from '../models';
import {defaultComponentsConfigurationSchema} from '../schema';
import {ItemConfig} from '../types';
import {ActionTypes, UpdateConfigsAction} from '../types/actions';
import {generateFromAJV} from '../utils/form-generator';

interface UseEditorInitializeProps {
    content: PageContent;
    setContent: (content: PageContent) => void;
}

const useEditorInitialize = ({setContent, content}: UseEditorInitializeProps) => {
    const {manipulateOverlayMode, isSelectActive} = useEditorStore();
    const sendMessage = useMessageSender();
    const {activeElement} = useContext(EditorContext);

    const onResize = useCallback(() => {
        const height = document.documentElement.getBoundingClientRect().height;

        sendMessage({
            type: ActionTypes.SetHeight,
            payload: {height},
        });

        if (isSelectActive && activeElement) {
            const rect = activeElement.getClientRects().item(0);

            if (rect) {
                sendMessage({
                    type: ActionTypes.UpdateSelectedBlockRect,
                    payload: {
                        rect: rect,
                    },
                });
            }
        }
    }, [activeElement, isSelectActive, sendMessage]);

    useMessageObserver<UpdateConfigsAction>(ActionTypes.UpdateConfigs, ({content: newContent}) => {
        setContent(newContent);
    });

    useEffect(() => {
        onResize();
    }, [content, onResize]);

    // Fires only once
    useEffect(() => {
        const height = document.documentElement.getBoundingClientRect().height;

        sendMessage(
            {
                type: ActionTypes.IframeReady,
                payload: {height},
            },
            {direction: 'editor'},
        );

        sendMessage({
            type: ActionTypes.BlocksConfigs,
            payload: {
                blocks: Object.entries(blockDataMap).reduce((acc, [key, value]) => {
                    acc.push({type: key, schema: value.schema});
                    return acc;
                }, [] as ItemConfig[]),
                subBlocks: [],
                global: generateFromAJV(
                    defaultComponentsConfigurationSchema as unknown as JSONSchemaType<{}>,
                ),
            },
        });
    }, [sendMessage]);

    useEffect(() => {
        const onMouseUp = (e: MouseEvent) => {
            if (manipulateOverlayMode === 'insert') {
                e.preventDefault();
                sendMessage({type: ActionTypes.InsertModeDisable, payload: undefined});
            }
            if (manipulateOverlayMode === 'reorder') {
                e.preventDefault();
                sendMessage({type: ActionTypes.ReorderModeDisable, payload: undefined});
            }
        };

        const onMouseMove = (event: MouseEvent) => {
            if (manipulateOverlayMode) {
                sendMessage({
                    type: ActionTypes.OverlayModeOnMove,
                    payload: {cursor: {x: event.clientX, y: event.clientY}},
                });
            }
        };

        const throttleOnMouseMove = _.throttle(onMouseMove, 1);
        const throttleOnMouseUp = _.throttle(onMouseUp, 1);

        document.addEventListener('mousemove', throttleOnMouseMove);
        document.addEventListener('mouseup', throttleOnMouseUp);
        window.addEventListener('resize', onResize);

        return () => {
            document.removeEventListener('mousemove', throttleOnMouseMove);
            document.removeEventListener('mouseup', throttleOnMouseUp);
            window.removeEventListener('resize', onResize);
        };
    }, [activeElement, manipulateOverlayMode, onResize, sendMessage]);
};

export default useEditorInitialize;
