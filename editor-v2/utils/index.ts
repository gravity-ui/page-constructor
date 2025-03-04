import _ from 'lodash';

import {ConstructorBlock} from '../../src/models';

export function insert<T>(arr: Array<T>, index: number, newItem: T) {
    return [...arr.slice(0, index), newItem, ...arr.slice(index)];
}

export function removeFromArray<T>(array: Array<T>, index: number) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function swapArrayItems<T>(array: Array<T>, firstIndex: number, secondIndex: number) {
    const results = array.slice();
    const firstItem = array[firstIndex];
    results[firstIndex] = array[secondIndex];
    results[secondIndex] = firstItem;
    return results;
}

export function reorderArrayItems<T>(array: Array<T>, index: number, destination: number) {
    const min = Math.min(index, destination);
    const max = Math.max(index, destination);
    const firstOperationRemove = index < destination;
    const result = [];
    result.push(...array.slice(0, min));
    if (!firstOperationRemove) {
        result.push(array[index]);
    }
    result.push(...array.slice(firstOperationRemove ? min + 1 : min, max));
    if (firstOperationRemove) {
        result.push(array[index]);
    }
    result.push(...array.slice(firstOperationRemove ? max : max + 1, array.length));
    return result;
}

export function duplicateArrayItem<T>(array: Array<T>, index: number) {
    const duplicatedItem = _.cloneDeep(array[index]);
    return [...array.slice(0, index), duplicatedItem, ...array.slice(index)];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function insertByPath<T extends object>(object: T, path: string, value: any) {
    if (!path) {
        return value as T;
    }

    return _.setWith(_.clone(object), path, value, _.clone);
}

/*
 *  path: string;
 *  Example:
 *  1. blocks[0] => {path: blocks, index: 0}
 *  2. blocks[2].children[10] => {path: blocks[2].children, index: 10}
 **/
export function splitPathAndIndex(path: string) {
    // Match blocks[3], blocks[0].children[12], blocks[0], blocks[999999]
    const bracketsRegExp = /(.*)\[(\d+)]$/g;
    const regexpMatches = [...path.matchAll(bracketsRegExp)];
    if (regexpMatches.length) {
        return {
            // blocks, blocks[0].children
            path: regexpMatches[0][1],
            // 3, 12, 0, 9999
            index: Number(regexpMatches[0][2]),
        };
    }

    // eslint-disable-next-line no-console
    console.error('Non correct path for splitting');
    return undefined;
}

/*
 * [0, 4, 3] => [0].children[4].children[3]
 * */
export function generateChildrenPathFromArray(indexes: number[]) {
    if (!indexes.length) {
        return '';
    }

    let resultPath = `[${indexes[0]}]`;

    if (indexes.length > 1) {
        for (let i = 1; i < indexes.length; i++) {
            resultPath += `.children[${indexes[i]}]`;
        }
    }

    return resultPath;
}

export function modifyObjectByPath(
    blocks: ConstructorBlock[],
    arrayPath: number[],
    modifyCallback: (parentBlocks: ConstructorBlock[], index: number) => ConstructorBlock[],
) {
    // [1]
    // [4].children[3]
    const insertPath = generateChildrenPathFromArray(arrayPath);
    // path: ''                 index: 1
    // path: '[4].children'     index: 3
    const splitPath = splitPathAndIndex(insertPath);

    if (splitPath) {
        const {path: parentPath, index} = splitPath;
        // Get Array that lies on path
        const parentArray = parentPath ? _.get(blocks, parentPath) : blocks;

        const value = Array.isArray(parentArray) ? parentArray : [];
        // Modify Array
        const newModifiedArray = modifyCallback(value, index);

        // Return it back
        return insertByPath(blocks, parentPath, newModifiedArray);
    }

    return blocks;
}

export function isItemsNeighbours(arrayA: number[], arrayB: number[]) {
    if (arrayA.length !== arrayB.length) {
        return false;
    }

    for (let i = 0; i < arrayA.length - 1; i++) {
        if (arrayA[i] !== arrayB[i]) {
            return false;
        }
    }

    return true;
}

export function getDestinationShiftBeforeReorder(arrayInit: number[], arrayDest: number[]) {
    if (arrayInit.length === arrayDest.length || arrayInit.length > arrayDest.length) {
        return arrayDest;
    }

    for (let i = 0; i < arrayInit.length; i++) {
        if (arrayInit[i] < arrayDest[i]) {
            return prepareShift(arrayInit, arrayDest);
        }
    }

    return arrayDest;
}

export function prepareShift(arrayInit: number[], arrayDest: number[]) {
    if (arrayInit.length === arrayDest.length || arrayInit.length > arrayDest.length) {
        return arrayDest;
    }

    return arrayDest.map((pathIndex, index) =>
        index === arrayInit.length - 1 ? pathIndex - 1 : pathIndex,
    );
}

export const getUrlOrigin = (url: string) => {
    try {
        const urlObject = new URL(url);
        return urlObject.origin;
    } catch {
        return undefined;
    }
};
