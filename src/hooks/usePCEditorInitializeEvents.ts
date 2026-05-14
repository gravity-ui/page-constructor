import * as React from 'react';

import _ from 'lodash';

import {toSerializableRect} from '../common/types/rect';
import {BlockData} from '../constructor-items';
import {BlockRegistry} from '../context/blockRegistryContext';
import {Fields} from '../form-generator-v2/types';
import {PageContent} from '../models';
// eslint-disable-next-line import/no-unassigned-import
import '../utils/iframe-resizer';

import {usePCEditorStore} from './usePCEditorStore';
import {sendEventPostMessage, useInternalPostMessageAPIListener} from './usePostMessageAPI';

interface UseEditorInitializeProps {
    initialContent: PageContent;
    setContent: (content: PageContent) => void;
    blocks: Array<BlockData>;
    global?: Fields;
    blockInputs?: Fields;
    registry: BlockRegistry | null;
}

function collectRectMap(registry: BlockRegistry) {
    return registry.getEntries().map(({path, element, dropZone}) => {
        const rect = element.getClientRects().item(0) ?? element.getBoundingClientRect();
        return {path, rect: toSerializableRect(rect), dropZone};
    });
}

export const usePCEditorInitializeEvents = ({
    initialContent,
    setContent,
    blocks,
    global,
    blockInputs,
    registry,
}: UseEditorInitializeProps) => {
    const {initialized, content} = usePCEditorStore();

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
            blocks: blocks.map((block) => ({
                type: block.type,
                schema: blockInputs?.length
                    ? {
                          ...block.schema,
                          inputs: [...blockInputs, ...(block.schema?.inputs || [])],
                      }
                    : block.schema,
            })),
            subBlocks: [],
            global: global || [],
        });
    });

    React.useEffect(() => {
        if (!registry) {
            return undefined;
        }

        let frame: number | null = null;

        const sendRectMap = () => {
            frame = null;
            sendEventPostMessage('ON_UPDATE_RECT_MAP', {rects: collectRectMap(registry)});
        };

        const scheduleSend = () => {
            if (frame !== null) {
                return;
            }
            frame = requestAnimationFrame(sendRectMap);
        };

        const throttledSchedule = _.throttle(scheduleSend, 100, {leading: true, trailing: true});

        const unsubscribe = registry.subscribe(throttledSchedule);
        const observer = new ResizeObserver(throttledSchedule);
        observer.observe(document.body);

        // Initial push once registry is ready.
        throttledSchedule();

        return () => {
            throttledSchedule.cancel();
            unsubscribe();
            observer.disconnect();
            if (frame !== null) {
                cancelAnimationFrame(frame);
            }
        };
    }, [registry]);

    React.useEffect(() => {
        sendEventPostMessage('ON_INIT', {});
    }, []);
};
