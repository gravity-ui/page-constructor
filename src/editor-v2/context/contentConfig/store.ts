import _ from 'lodash';

import {ActionTypes, ConfigInput, ItemConfig, WithStoreReducer} from '../../../common/types';
import {ConstructorBlock, PageContent} from '../../../models';
import {DynamicFormValue} from '../../components/DynamicForm/DynamicForm';
import {
    duplicateArrayItem,
    generateChildrenPathFromArray,
    getDestinationShiftBeforeReorder,
    insert,
    isItemsNeighbours,
    modifyObjectByPath,
    removeFromArray,
    reorderArrayItems,
} from '../../utils';
import {initializeStore} from '../../utils/store';

export interface ContentConfigState {
    config: PageContent;
    blocks: Array<ItemConfig>;
    subBlocks: Array<ItemConfig>;
    global: Array<ConfigInput>;

    preInsertBlockType: string | null;
    preReorderBlockPath: number[] | null;
}

export interface ContentConfigMethods extends WithStoreReducer {
    setConfig: (config: PageContent) => void;
    setBlocks: (blocks: ItemConfig[]) => void;
    setSubBlocks: (subBlocks: ItemConfig[]) => void;
    insertBlock: (position: number[], blockType: string) => void;
    deleteBlock: (path: number[]) => void;
    duplicateBlock: (path: number[]) => void;
    reorderBlock: (path: number[], destination: number[]) => void;
    updateField: (path: string, value: DynamicFormValue) => void;
    resetBlocks: () => void;
}

export type ContentConfigStore = ContentConfigState & ContentConfigMethods;

export const createContentConfigStore = initializeStore<ContentConfigState, ContentConfigMethods>(
    {
        config: {blocks: []},
        blocks: [],
        subBlocks: [],
        global: [],
        preInsertBlockType: null,
        preReorderBlockPath: null,
    },
    (set, get) => ({
        setConfig: (config) => set((state) => ({...state, config})),
        setBlocks: (blocks) => set((state) => ({...state, blocks})),
        setSubBlocks: (subBlocks) => set((state) => ({...state, subBlocks})),
        insertBlock: (arrayPath, blockType) => {
            const blocksConfig = get().config.blocks;
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
                config: {...state.config, blocks: newBlocksConfig},
            }));
        },
        deleteBlock: (arrayPath) => {
            const blocksConfig = get().config.blocks;

            const newBlocksConfig = modifyObjectByPath(blocksConfig, arrayPath, removeFromArray);

            set((state) => ({
                ...state,
                config: {...state.config, blocks: newBlocksConfig},
            }));
        },
        duplicateBlock: (arrayPath) => {
            const blocksConfig = get().config.blocks;

            const newBlocksConfig = modifyObjectByPath(blocksConfig, arrayPath, duplicateArrayItem);

            set((state) => ({
                ...state,
                config: {...state.config, blocks: newBlocksConfig},
            }));
        },
        updateField: (path, value) => {
            set((state) => {
                const newConfig = _.set(state.config, path, value);
                return {
                    ...state,
                    config: newConfig,
                };
            });
        },
        reorderBlock: (arrayPath, destination) => {
            let newBlocksConfig: ConstructorBlock[];
            const blocksConfig = get().config.blocks;
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
            } else {
                const arrayDest = getDestinationShiftBeforeReorder(arrayPath, destination);

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
                config: {...state.config, blocks: newBlocksConfig},
            }));
        },
        resetBlocks: () => {
            set((state) => ({
                ...state,
                config: {...state.config, blocks: []},
            }));
        },
        reducer: function (action) {
            switch (action.type) {
                // Insert Actions
                case ActionTypes.InsertModeEnable: {
                    set((state) => ({
                        ...state,
                        preInsertBlockType: action.payload.blockType,
                    }));
                    break;
                }
                case ActionTypes.InsertModeDisable: {
                    set((state) => ({
                        ...state,
                        preInsertBlockType: null,
                    }));
                    break;
                }

                case ActionTypes.InsertBlock: {
                    const {preInsertBlockType} = get();
                    if (preInsertBlockType) {
                        const {path} = action.payload;
                        this.insertBlock(path, preInsertBlockType);
                    }
                    break;
                }
                // Reorder Actions
                case ActionTypes.ReorderModeEnable: {
                    set((state) => ({
                        ...state,
                        preReorderBlockPath: action.payload.path,
                    }));
                    break;
                }
                case ActionTypes.ReorderModeDisable: {
                    set((state) => ({
                        ...state,
                        preReorderBlockPath: null,
                    }));
                    break;
                }
                case ActionTypes.ReorderBlocks: {
                    const {preReorderBlockPath} = get();
                    if (preReorderBlockPath) {
                        const {path: destinationPath} = action.payload;
                        this.reorderBlock(preReorderBlockPath, destinationPath);
                    }
                    break;
                }
                case ActionTypes.BlocksConfigs: {
                    set((state) => ({
                        ...state,
                        blocks: action.payload.blocks,
                        subBlocks: action.payload.subBlocks,
                        global: action.payload.global,
                    }));
                    break;
                }
            }
        },
    }),
);
