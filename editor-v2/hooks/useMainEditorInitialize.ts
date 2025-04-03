import {usePostMessageAPIListener} from '../../common/postMessage';

import {useMainEditorStore} from './useMainEditorStore';
import {usePostMessageEvents} from './usePostMessageEvents';

const useMainEditorInitialize = () => {
    const {requestPostMessage} = usePostMessageEvents();
    const {
        initialize,
        setConfig,
        setContent,
        manipulateOverlayMode,
        disableMode,
        insertBlock,
        reorderBlock,
        preInsertBlockType,
        preReorderBlockPath,
    } = useMainEditorStore();

    usePostMessageAPIListener(
        'ON_INIT',
        () => {
            initialize();
            requestPostMessage('GET_SUPPORTED_BLOCKS', {});
            requestPostMessage('GET_INITIAL_CONTENT', {});
        },
        [requestPostMessage],
    );

    usePostMessageAPIListener('ON_INITIAL_CONTENT', (data) => {
        setContent(data);
    });

    usePostMessageAPIListener('ON_SUPPORTED_BLOCKS', (data) => {
        setConfig(data);
    });

    usePostMessageAPIListener(
        'ON_MOUSE_UP',
        ({path, position}) => {
            if (manipulateOverlayMode === 'insert' && path && position && preInsertBlockType) {
                insertBlock(
                    path,
                    preInsertBlockType,
                    ['left', 'top'].includes(position) ? 'prepend' : 'append',
                );
            }
            if (manipulateOverlayMode === 'reorder' && path && position && preReorderBlockPath) {
                reorderBlock(
                    preReorderBlockPath,
                    path,
                    ['left', 'top'].includes(position) ? 'prepend' : 'append',
                );
            }
            disableMode();
        },
        [preInsertBlockType, preReorderBlockPath],
    );
};

export default useMainEditorInitialize;
