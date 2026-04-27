import * as React from 'react';

import {usePostMessageAPIListener} from '../../common/postMessage';
import {PageContent} from '../../models';

import {useMainEditorStore} from './useMainEditorStore';
import {usePostMessageEvents} from './usePostMessageEvents';

const useMainEditorInitialize = (content?: PageContent) => {
    const {requestPostMessage} = usePostMessageEvents();
    const {initialize, setConfig, setContent} = useMainEditorStore();

    usePostMessageAPIListener(
        'ON_INIT',
        () => {
            initialize();
            requestPostMessage('GET_SUPPORTED_BLOCKS', {});

            if (!content) {
                requestPostMessage('GET_INITIAL_CONTENT', {});
            }
        },
        [requestPostMessage],
    );

    React.useEffect(() => {
        if (content) {
            setContent(content, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    usePostMessageAPIListener('ON_INITIAL_CONTENT', (data) => {
        setContent(data, true);
    });

    usePostMessageAPIListener('ON_SUPPORTED_BLOCKS', (data) => {
        setConfig(data);
    });
};

export default useMainEditorInitialize;
