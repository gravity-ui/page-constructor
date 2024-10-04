import {Action, ActionTypes, WithStoreReducer} from '../../../common/types';
import {initializeStore} from '../../utils/store';

export interface EditorState {
    manipulateOverlayMode: 'insert' | 'reorder' | false;
    selectedBlock?: {
        path: number[];
        rect: DOMRect;
    };
    initialized: boolean;
}

export interface EditorMethods extends WithStoreReducer {
    resetInitialize: () => void;
}

export type EditorStore = EditorState & EditorMethods;

export const createEditorStore = initializeStore<EditorState, EditorMethods>(
    {
        manipulateOverlayMode: false,
        initialized: false,
    },
    (set, get) => ({
        resetInitialize: () => {
            set((state) => ({
                ...state,
                initialized: false,
            }));
        },
        reducer: (action: Action) => {
            switch (action.type) {
                case ActionTypes.IframeReady: {
                    set((state) => ({
                        ...state,
                        initialized: true,
                    }));
                    break;
                }
                case ActionTypes.ReorderModeEnable: {
                    set((state) => ({
                        ...state,
                        manipulateOverlayMode: 'reorder',
                    }));
                    break;
                }
                case ActionTypes.ReorderModeDisable: {
                    set((state) => ({
                        ...state,
                        manipulateOverlayMode: false,
                    }));
                    break;
                }
                case ActionTypes.InsertModeEnable: {
                    set((state) => ({
                        ...state,
                        manipulateOverlayMode: 'insert',
                    }));
                    break;
                }
                case ActionTypes.InsertModeDisable: {
                    set((state) => ({
                        ...state,
                        manipulateOverlayMode: false,
                    }));
                    break;
                }
                case ActionTypes.SelectBlock: {
                    set((state) => ({
                        ...state,
                        selectedBlock: {
                            path: action.payload.path,
                            rect: action.payload.rect,
                        },
                    }));
                    break;
                }
                case ActionTypes.UpdateSelectedBlockRect: {
                    const {selectedBlock} = get();
                    if (selectedBlock) {
                        set((state) => ({
                            ...state,
                            selectedBlock: {
                                ...selectedBlock,
                                rect: action.payload.rect,
                            },
                        }));
                    }
                    break;
                }
                case ActionTypes.ReorderBlocks: {
                    set((state) => ({
                        ...state,
                        selectedBlock: undefined,
                    }));
                    break;
                }
            }
        },
    }),
);
