import {useCallback, useEffect} from 'react';

import {JSONSchemaType} from 'ajv';
import _ from 'lodash';

import {ItemConfig} from '../common/types';
import {blockDataMap} from '../constructor-items';
import {PageContent} from '../models';
import {defaultComponentsConfigurationSchema} from '../schema';
import {generateFromAJV} from '../utils/form-generator';

import {usePCEditorStore} from './usePCEditorStore';
import {sendEventPostMessage, useInternalPostMessageAPIListener} from './usePostMessageAPI';

interface UseEditorInitializeProps {
    initialContent: PageContent;
    setContent: (content: PageContent) => void;
}

export const usePCEditorInitializeEvents = ({
    initialContent,
    setContent,
}: UseEditorInitializeProps) => {
    const {manipulateOverlayMode, initialized, content} = usePCEditorStore();

    useEffect(() => {
        if (initialized) {
            setContent(content);
        }
    }, [content, initialized, setContent]);

    useInternalPostMessageAPIListener('GET_INITIAL_CONTENT', () => {
        sendEventPostMessage('ON_INITIAL_CONTENT', initialContent);
    });

    useInternalPostMessageAPIListener('GET_SUPPORTED_BLOCKS', () => {
        sendEventPostMessage('ON_SUPPORTED_BLOCKS', {
            blocks: Object.entries(blockDataMap).reduce((acc, [key, value]) => {
                acc.push({type: key, schema: value.schema});
                return acc;
            }, [] as ItemConfig[]),
            subBlocks: [],
            global: generateFromAJV(
                defaultComponentsConfigurationSchema as unknown as JSONSchemaType<{}>,
            ),
        });
    });

    const onResize = useCallback(() => {
        const height = document.documentElement.getBoundingClientRect().height;
        sendEventPostMessage('ON_RESIZE', {height});
    }, []);

    new ResizeObserver(onResize).observe(document.body);

    useEffect(() => {
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

    useEffect(() => {
        const height = document.documentElement.getBoundingClientRect().height;
        sendEventPostMessage('ON_INIT', {height});
    }, []);
};
