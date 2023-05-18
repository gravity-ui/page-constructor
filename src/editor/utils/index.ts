import {Block, PageData} from '../../../src/models';
import {EditorBlockId} from '../hooks/useEditor';

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

export const addBlock = (array: Block[], block: Block, id: EditorBlockId) => {
    const result = [...array];

    if (id === -1) {
        return result.concat(block);
    }

    const index = typeof id === 'string' ? 0 : id;
    result.splice(index + 1, 0, block);

    return result;
};

export const addEditorProps = (data: PageData) => {
    return {...data, content: {...data.content, animated: false}};
};
