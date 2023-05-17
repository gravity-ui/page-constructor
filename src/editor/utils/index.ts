import {Block, PageData} from '../../../src/models';

export const changeBlocksOrder = (array: Block[], oldIndex: number, newIndex: number) => {
    const newArray = [...array];
    const element = newArray.splice(oldIndex, 1)[0];
    newArray.splice(newIndex, 0, element);

    return newArray;
};

export const duplicateBlock = (array: Block[], index: number) => {
    const newArray = [...array];
    newArray.splice(index, 0, newArray[index]);

    return newArray;
};

export const addEditorProps = (data: PageData) => {
    return {...data, content: {...data.content, animated: false}};
};
