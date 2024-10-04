import {ActionTypes, WithStoreReducer} from '../../../common/types';
import {initializeStore} from '../../utils/store';

export interface IframeState {
    url: string;
    height?: number;
}

export interface IframeMethods extends WithStoreReducer {
    setUrl: (url: string) => void;
}

export type IframeStore = IframeState & IframeMethods;

export const createIframeStore = initializeStore<IframeState, IframeMethods>(
    {
        url: '',
        height: 400,
    },
    (set) => ({
        setUrl: (url) => set((state) => ({...state, url})),
        reducer: (action) => {
            switch (action.type) {
                case ActionTypes.SetHeight: {
                    set((state) => ({
                        ...state,
                        height: action.payload.height + 200,
                    }));
                    break;
                }
            }
        },
    }),
);
