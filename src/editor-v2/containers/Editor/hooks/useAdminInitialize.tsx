import {usePostMessageAPIListener} from '../../../../common/postMessage';
import {useMainEditorStore} from '../../../context/editorStore';
import {usePostMessageEvents} from '../../../hooks/usePostMessageEvents';

const useAdminInitialize = () => {
    const {requestPostMessage} = usePostMessageEvents();
    const {
        initialize,
        setConfig,
        setContent,
        manipulateOverlayMode,
        disableMode,
        insertBlock,
        reorderBlock,
        setSelectedBlock,
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

    usePostMessageAPIListener('ON_MOUSE_UP', ({path, position}) => {
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
            setSelectedBlock(path);
        }
        disableMode();
    });
};

export default useAdminInitialize;
