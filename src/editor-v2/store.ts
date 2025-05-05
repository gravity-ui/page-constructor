import _ from 'lodash';

import {EditorState, initialStore} from '../common/store';
import {DynamicFormValue} from '../common/types';
import {initializeStore} from '../common/utils';
import {ConstructorBlock, PageContentWithNavigation} from '../models';

import {ZOOM_STEPS} from './constants';
import {
    duplicateArrayItem,
    generateChildrenPathFromArray,
    getDestinationShiftBeforeReorder,
    insert,
    isItemsNeighbours,
    modifyObjectByPath,
    removeFromArray,
    reorderArrayItems,
} from './utils';

export interface EditorMethods {
    initialize(): void;
    setSelectedBlock(path: number[] | null): void;
    setHeight(height: number): void;
    setDeviceWidth(deviceWidth: string): void;
    setZoom(zoom: number): void;
    increaseZoom(): void;
    decreaseZoom(): void;
    togglePreviewMode(): void;
    setConfig(data: Pick<EditorState, 'blocks' | 'subBlocks' | 'global'>): void;
    setContent(data: PageContentWithNavigation): void;
    insertBlock(path: number[], blockType: string, position?: 'prepend' | 'append'): void;
    enableInsertMode(blockType: string): void;
    enableReorderMode(path: number[]): void;
    disableMode(): void;
    updateField(path: string, value: DynamicFormValue): void;
    deleteBlock(path: number[]): void;
    duplicateBlock(path: number[]): void;
    reorderBlock(path: number[], destination: number[], position?: 'prepend' | 'append'): void;
    resetInitialize(): void;
    resetBlocks(): void;
}

export type EditorStore = EditorState & EditorMethods;

export const createEditorStore = initializeStore<EditorState, EditorMethods>(
    initialStore,
    (set, get) => ({
        setHeight(height: number) {
            // We have to add 200-500px, because of bottom padding or margin of last element
            // which is not taken into calculation of final height
            const newHeight = height + 500;
            set((state) => ({...state, height: newHeight}));
        },
        setDeviceWidth(deviceWidth: string) {
            set((state) => ({...state, deviceWidth}));
        },
        setZoom(zoom) {
            if (zoom > 0) {
                set((state) => ({...state, zoom}));
            }
        },
        increaseZoom() {
            const currentZoom = get().zoom;

            for (const step of ZOOM_STEPS) {
                if (currentZoom < step) {
                    get().setZoom(step);
                    break;
                }
            }
        },
        decreaseZoom() {
            const currentZoom = get().zoom;
            const reverseSteps = ZOOM_STEPS.slice().reverse();

            for (const step of reverseSteps) {
                if (currentZoom > step) {
                    get().setZoom(step);
                    break;
                }
            }
        },
        togglePreviewMode() {
            set((state) => ({...state, isPreviewMode: !state.isPreviewMode}));
        },
        setConfig(data) {
            set((state) => ({...state, ...data}));
        },
        insertBlock: (arrayPath, blockType, position = 'append') => {
            if (position === 'append') {
                // TODO: fix
                // eslint-disable-next-line no-not-accumulator-reassign/no-not-accumulator-reassign, no-param-reassign
                arrayPath[arrayPath.length - 1] = arrayPath[arrayPath.length - 1] + 1;
            }

            const blocksConfig = get().content.blocks;
            const blocksData = get().blocks;

            const foundBlock = blocksData.find(({type}) => type === blockType);
            const defaultValue =
                foundBlock && foundBlock.schema.default
                    ? {...foundBlock.schema.default, type: blockType}
                    : {type: blockType};

            const newBlocksConfig = modifyObjectByPath(
                blocksConfig,
                arrayPath,
                (parentBlocks, index) =>
                    insert(parentBlocks, index, defaultValue as ConstructorBlock),
            );

            set((state) => ({
                ...state,
                content: {...state.content, blocks: newBlocksConfig},
                selectedBlock: arrayPath,
            }));
        },
        enableInsertMode(blockType: string) {
            set((state) => ({
                ...state,
                manipulateOverlayMode: 'insert',
                preInsertBlockType: blockType,
            }));
        },
        disableMode() {
            set((state) => ({
                ...state,
                manipulateOverlayMode: false,
                preInsertBlockType: undefined,
                preReorderBlockPath: undefined,
            }));
        },
        enableReorderMode(path) {
            set((state) => ({
                ...state,
                manipulateOverlayMode: 'reorder',
                preReorderBlockPath: path,
            }));
        },
        setContent(content) {
            set((state) => ({
                ...state,
                content: content,
            }));
        },
        initialize() {
            set((state) => ({
                ...state,
                initialized: true,
            }));
        },
        setSelectedBlock(path) {
            set((state) => ({
                ...state,
                selectedBlock: path,
            }));
        },
        updateField(path, value) {
            set((state) => {
                const newConfig = _.set(state.content, path, value);
                return {
                    ...state,
                    content: newConfig,
                };
            });
        },
        deleteBlock: (arrayPath) => {
            const blocksConfig = get().content.blocks;

            const newBlocksConfig = modifyObjectByPath(blocksConfig, arrayPath, removeFromArray);
            set((state) => ({
                ...state,
                content: {...state.content, blocks: newBlocksConfig},
                selectedBlock: null,
            }));
        },
        duplicateBlock: (arrayPath) => {
            const blocksConfig = get().content.blocks;

            const newBlocksConfig = modifyObjectByPath(blocksConfig, arrayPath, duplicateArrayItem);

            set((state) => ({
                ...state,
                content: {...state.content, blocks: newBlocksConfig},
            }));
        },
        reorderBlock: (arrayPath, destination, position = 'append') => {
            // Create a copy of the destination array before any modifications
            let finalDestinationPath: number[] = _.cloneDeep(destination);

            if (position === 'append') {
                // TODO: fix
                // eslint-disable-next-line no-not-accumulator-reassign/no-not-accumulator-reassign, no-param-reassign
                destination[destination.length - 1] = destination[destination.length - 1] + 1;
            }

            let newBlocksConfig: ConstructorBlock[];
            const blocksConfig = get().content.blocks;
            // Copy
            const copiedBlock = _.get(blocksConfig, generateChildrenPathFromArray(arrayPath));

            if (isItemsNeighbours(arrayPath, destination)) {
                newBlocksConfig = modifyObjectByPath(blocksConfig, arrayPath, (parentBlocks) => {
                    return reorderArrayItems(
                        parentBlocks,
                        arrayPath[arrayPath.length - 1],
                        destination[destination.length - 1],
                    );
                });

                if (
                    position === 'append' &&
                    destination[destination.length - 1] < arrayPath[arrayPath.length - 1]
                ) {
                    finalDestinationPath[finalDestinationPath.length - 1] =
                        finalDestinationPath[finalDestinationPath.length - 1] + 1;
                }
            } else {
                const arrayDest = getDestinationShiftBeforeReorder(arrayPath, destination);
                finalDestinationPath = _.cloneDeep(arrayDest);

                // Delete
                const blocksConfigWithoutBlock = modifyObjectByPath(
                    blocksConfig,
                    arrayPath,
                    removeFromArray,
                );
                // Paste
                newBlocksConfig = modifyObjectByPath(
                    blocksConfigWithoutBlock,
                    arrayDest,
                    (parentBlocks, index) => insert(parentBlocks, index, copiedBlock),
                );
            }

            set((state) => ({
                ...state,
                content: {...state.content, blocks: newBlocksConfig},
                selectedBlock: finalDestinationPath,
            }));
        },
        resetInitialize: () => {
            set((state) => ({
                ...state,
                initialized: false,
            }));
        },
        resetBlocks: () => {
            set((state) => ({
                ...state,
                content: {...state.content, blocks: []},
            }));
        },
    }),
);
