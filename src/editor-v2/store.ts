import _ from 'lodash';

import {EditorHistorySnapshot, EditorState, initialStore} from '../common/store';
import {RectMapEntry} from '../common/types/rect';
import {initializeStore} from '../common/utils';
import {ConstructorBlock, PageContent} from '../models';

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

const MAX_EDITOR_HISTORY = 50;
const HISTORY_DEBOUNCE_MS = 500;

/** After unsetting a leaf, remove empty `{}` parents (e.g. `seo` after `seo.slug` is removed). */
function pruneEmptyObjectAncestors(root: object, unsetPath: string) {
    const segments = _.toPath(unsetPath);
    for (let depth = segments.length - 1; depth >= 1; depth--) {
        const parentPath = segments.slice(0, depth);
        const parentVal = _.get(root, parentPath);
        if (_.isPlainObject(parentVal) && Object.keys(parentVal as object).length === 0) {
            _.unset(root, parentPath);
        }
    }
}

function snapshotEditorHistory(state: EditorState): EditorHistorySnapshot {
    return {
        content: _.cloneDeep(state.content),
        selectedBlock: state.selectedBlock ? [...state.selectedBlock] : null,
    };
}

function appendHistoryPast(
    past: EditorHistorySnapshot[],
    snapshot: EditorHistorySnapshot,
): EditorHistorySnapshot[] {
    return [...past.slice(-(MAX_EDITOR_HISTORY - 1)), snapshot];
}

export interface EditorMethods {
    initialize(): void;
    setSelectedBlock(path: number[] | null): void;
    setRectMap(rects: RectMapEntry[]): void;
    setHeight(height: number): void;
    setDeviceWidth(deviceWidth: string): void;
    setZoom(zoom: number): void;
    increaseZoom(): void;
    decreaseZoom(): void;
    togglePreviewMode(): void;
    setConfig(data: Pick<EditorState, 'blocks' | 'subBlocks' | 'global'>): void;
    setContent(data: PageContent, skipHistory?: boolean): void;
    insertBlock(path: number[], blockType: string, position?: 'prepend' | 'append'): void;
    enableInsertMode(blockType: string): void;
    enableReorderMode(path: number[]): void;
    disableMode(): void;
    updateField(path: string, value: unknown): void;
    deleteBlock(path: number[]): void;
    duplicateBlock(path: number[]): void;
    reorderBlock(path: number[], destination: number[], position?: 'prepend' | 'append'): void;
    resetInitialize(): void;
    resetBlocks(): void;
    undo(): void;
    redo(): void;
}

export type EditorStore = EditorState & EditorMethods;

export const createEditorStore = initializeStore<EditorState, EditorMethods>(
    initialStore,
    (set, get) => {
        let pendingSnapshot: EditorHistorySnapshot | null = null;
        let updateFieldTimer: ReturnType<typeof setTimeout> | null = null;

        function clearUpdateFieldTimer() {
            if (updateFieldTimer !== null) {
                clearTimeout(updateFieldTimer);
                updateFieldTimer = null;
            }
        }

        function commitPending() {
            clearUpdateFieldTimer();
            if (pendingSnapshot !== null) {
                const snapshot = pendingSnapshot;
                pendingSnapshot = null;
                set((state) => ({
                    ...state,
                    historyPast: appendHistoryPast(state.historyPast, snapshot),
                    historyFuture: [],
                }));
            }
        }

        return {
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
            undo() {
                if (pendingSnapshot !== null) {
                    const snapshot = pendingSnapshot;
                    clearUpdateFieldTimer();
                    pendingSnapshot = null;
                    set((state) => {
                        const currentSnap = snapshotEditorHistory(state);
                        return {
                            ...state,
                            content: snapshot.content,
                            selectedBlock: snapshot.selectedBlock,
                            historyFuture: [currentSnap, ...state.historyFuture],
                        };
                    });
                    return;
                }
                set((state) => {
                    if (state.historyPast.length === 0) {
                        return state;
                    }

                    const past = [...state.historyPast];
                    const previous = past.pop();
                    if (previous === undefined) {
                        return state;
                    }

                    const currentSnap = snapshotEditorHistory(state);

                    return {
                        ...state,
                        content: previous.content,
                        selectedBlock: previous.selectedBlock,
                        historyPast: past,
                        historyFuture: [currentSnap, ...state.historyFuture],
                    };
                });
            },
            redo() {
                clearUpdateFieldTimer();
                pendingSnapshot = null;
                set((state) => {
                    if (state.historyFuture.length === 0) {
                        return state;
                    }

                    const future = [...state.historyFuture];
                    const next = future.shift();
                    if (next === undefined) {
                        return state;
                    }

                    const currentSnap = snapshotEditorHistory(state);

                    return {
                        ...state,
                        content: next.content,
                        selectedBlock: next.selectedBlock,
                        historyPast: appendHistoryPast(state.historyPast, currentSnap),
                        historyFuture: future,
                    };
                });
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

                set((state) => {
                    const before = snapshotEditorHistory(state);

                    return {
                        ...state,
                        historyPast: appendHistoryPast(state.historyPast, before),
                        historyFuture: [],
                        content: {...state.content, blocks: newBlocksConfig},
                        selectedBlock: arrayPath,
                    };
                });
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
            setContent(content, skipHistory = false) {
                set((state) => {
                    if (skipHistory) {
                        return {
                            ...state,
                            historyPast: state.historyPast,
                            historyFuture: [],
                            content,
                        };
                    }

                    const before = snapshotEditorHistory(state);

                    return {
                        ...state,
                        historyPast: appendHistoryPast(state.historyPast, before),
                        historyFuture: [],
                        content,
                    };
                });
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
            setRectMap(rects) {
                set((state) => {
                    if (_.isEqual(state.rectMap, rects)) {
                        return state;
                    }
                    return {...state, rectMap: rects};
                });
            },
            updateField(path, value) {
                if (pendingSnapshot === null) {
                    pendingSnapshot = snapshotEditorHistory(get());
                }

                clearUpdateFieldTimer();
                updateFieldTimer = setTimeout(() => {
                    updateFieldTimer = null;
                    commitPending();
                }, HISTORY_DEBOUNCE_MS);

                set((state) => {
                    const newConfig = _.cloneDeep(state.content);
                    // `_.set(..., undefined)` leaves empty objects; clearing a field should remove the key.
                    if (value === undefined) {
                        _.unset(newConfig, path);
                        pruneEmptyObjectAncestors(newConfig, path);
                    } else {
                        _.set(newConfig, path, value);
                    }
                    return {...state, historyFuture: [], content: newConfig};
                });
            },
            deleteBlock: (arrayPath) => {
                const blocksConfig = get().content.blocks;

                const newBlocksConfig = modifyObjectByPath(
                    blocksConfig,
                    arrayPath,
                    removeFromArray,
                );
                set((state) => {
                    const before = snapshotEditorHistory(state);

                    return {
                        ...state,
                        historyPast: appendHistoryPast(state.historyPast, before),
                        historyFuture: [],
                        content: {...state.content, blocks: newBlocksConfig},
                        selectedBlock: null,
                    };
                });
            },
            duplicateBlock: (arrayPath) => {
                const blocksConfig = get().content.blocks;

                const newBlocksConfig = modifyObjectByPath(
                    blocksConfig,
                    arrayPath,
                    duplicateArrayItem,
                );

                set((state) => {
                    const before = snapshotEditorHistory(state);

                    return {
                        ...state,
                        historyPast: appendHistoryPast(state.historyPast, before),
                        historyFuture: [],
                        content: {...state.content, blocks: newBlocksConfig},
                    };
                });
            },
            reorderBlock: (arrayPath, destination, position = 'append') => {
                const dest = _.cloneDeep(destination);
                let finalDestinationPath: number[] = _.cloneDeep(destination);

                if (position === 'append') {
                    dest[dest.length - 1] = dest[dest.length - 1] + 1;
                }

                let newBlocksConfig: ConstructorBlock[];
                const blocksConfig = get().content.blocks;
                // Copy
                const copiedBlock = _.get(blocksConfig, generateChildrenPathFromArray(arrayPath));

                if (isItemsNeighbours(arrayPath, dest)) {
                    newBlocksConfig = modifyObjectByPath(
                        blocksConfig,
                        arrayPath,
                        (parentBlocks) => {
                            return reorderArrayItems(
                                parentBlocks,
                                arrayPath[arrayPath.length - 1],
                                dest[dest.length - 1],
                            );
                        },
                    );

                    if (
                        position === 'append' &&
                        dest[dest.length - 1] < arrayPath[arrayPath.length - 1]
                    ) {
                        finalDestinationPath[finalDestinationPath.length - 1] =
                            finalDestinationPath[finalDestinationPath.length - 1] + 1;
                    }
                } else {
                    const arrayDest = getDestinationShiftBeforeReorder(arrayPath, dest);
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

                set((state) => {
                    const before = snapshotEditorHistory(state);

                    return {
                        ...state,
                        historyPast: appendHistoryPast(state.historyPast, before),
                        historyFuture: [],
                        content: {...state.content, blocks: newBlocksConfig},
                        selectedBlock: finalDestinationPath,
                    };
                });
            },
            resetInitialize: () => {
                set((state) => ({
                    ...state,
                    initialized: false,
                }));
            },
            resetBlocks: () => {
                set((state) => {
                    const before = snapshotEditorHistory(state);

                    return {
                        ...state,
                        historyPast: appendHistoryPast(state.historyPast, before),
                        historyFuture: [],
                        content: {...state.content, blocks: []},
                    };
                });
            },
        };
    },
);
