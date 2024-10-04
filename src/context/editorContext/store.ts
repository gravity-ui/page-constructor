import {WithStoreReducer} from '../../types';
import {ActionTypes} from '../../types/actions';
import {initializeStore} from '../../utils/store';

export interface EditorState {
    manipulateOverlayMode: 'insert' | 'reorder' | false;
    isSelectActive: boolean;
    initialized: boolean;
}

export interface EditorMethods extends WithStoreReducer {}

export type EditorStore = EditorState & EditorMethods;

export const createEditorStore = initializeStore<EditorState, EditorMethods>(
    {
        manipulateOverlayMode: false,
        isSelectActive: false,
        initialized: false,
    },
    (set, _get) => ({
        reducer: (action) => {
            switch (action.type) {
                case ActionTypes.EditorReady: {
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
                        isSelectActive: true,
                    }));
                    break;
                }
            }
        },
    }),
);
