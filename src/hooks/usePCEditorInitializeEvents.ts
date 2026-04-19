import * as React from 'react';

import _ from 'lodash';

import {BlockData} from '../constructor-items';
import {PageContent} from '../models';

import {usePCEditorStore} from './usePCEditorStore';
import {sendEventPostMessage, useInternalPostMessageAPIListener} from './usePostMessageAPI';
import {Fields} from '../form-generator-v2/types';

interface UseEditorInitializeProps {
    initialContent: PageContent;
    setContent: (content: PageContent) => void;
    blocks: Array<BlockData>;
    global?: Fields;
}

export const usePCEditorInitializeEvents = ({
    initialContent,
    setContent,
    blocks,
    global,
}: UseEditorInitializeProps) => {
    const {manipulateOverlayMode, initialized, content} = usePCEditorStore();

    React.useEffect(() => {
        if (initialized) {
            setContent(content);
        }
    }, [content, initialized, setContent]);

    useInternalPostMessageAPIListener('GET_INITIAL_CONTENT', () => {
        sendEventPostMessage('ON_INITIAL_CONTENT', initialContent);
    });

    useInternalPostMessageAPIListener('GET_SUPPORTED_BLOCKS', () => {
        sendEventPostMessage('ON_SUPPORTED_BLOCKS', {
            blocks: blocks.map((block) => ({type: block.type, schema: block.schema})),
            subBlocks: [],
            global: global || [],
        });
    });

    const onResize = React.useCallback(() => {
        const height = document.documentElement.getBoundingClientRect().height;
        sendEventPostMessage('ON_RESIZE', {height});
    }, []);

    new ResizeObserver(onResize).observe(document.body);

    React.useEffect(() => {
        const onMouseUp = () => {
            sendEventPostMessage('ON_MOUSE_UP', {});
        };

        const onMouseMove = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            sendEventPostMessage('ON_MOUSE_MOVE', {x: event.clientX, y: event.clientY});
        };

        const throttleOnMouseMove = _.throttle(onMouseMove, 10);
        const throttleOnMouseUp = _.throttle(onMouseUp, 10);

        document.addEventListener('mousemove', throttleOnMouseMove);
        document.addEventListener('mouseup', throttleOnMouseUp);
        window.addEventListener('resize', onResize);

        return () => {
            document.removeEventListener('mousemove', throttleOnMouseMove);
            document.removeEventListener('mouseup', throttleOnMouseUp);
            window.removeEventListener('resize', onResize);
        };
    }, [manipulateOverlayMode, onResize]);

    React.useEffect(() => {
        const height = document.documentElement.getBoundingClientRect().height;
        sendEventPostMessage('ON_INIT', {height});
    }, []);
};
