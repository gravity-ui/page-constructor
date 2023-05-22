import _ from 'lodash';

import {Block, PageData} from '../../models';

import {EditorBlockId} from './reducer';

export const changeBlocksOrder = (array: Block[], oldIndex: number, newIndex: number) => {
    const result = [...array];
    const element = result.splice(oldIndex, 1)[0];
    result.splice(newIndex, 0, element);

    return result;
};

export const duplicateBlock = (array: Block[], index: number) => {
    const result = [...array];
    result.splice(index + 1, 0, result[index]);

    return result;
};

export const getNewBlockIndex = (id: EditorBlockId, orderedBlocksCount: number) => {
    if (id === -1) {
        return orderedBlocksCount;
    }

    // id === 'string' - header block
    return typeof id === 'string' ? 0 : id + 1;
};

export const addBlock = (array: Block[], block: Block, index: number) => {
    const result = [...array];
    result.splice(index, 0, block);

    return result;
};

export const addEditorProps = (data: PageData) => {
    return {...data, content: {...data.content, animated: false}};
};
