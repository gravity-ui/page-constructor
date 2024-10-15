import {ActionTypes, WithStoreReducer} from '../../../common/types';
import {ZOOM_STEPS} from '../../constants';
import {initializeStore} from '../../utils/store';

export interface IframeState {
    url: string;
    height?: number;
    // In percents
    zoom: number;
}

export interface IframeMethods extends WithStoreReducer {
    setUrl: (url: string) => void;
    setZoom: (zoom: number) => void;
    increaseZoom: () => void;
    decreaseZoom: () => void;
}

export type IframeStore = IframeState & IframeMethods;

export const createIframeStore = initializeStore<IframeState, IframeMethods>(
    {
        url: '',
        height: 400,
        zoom: 100,
    },
    (set, get) => ({
        setZoom: function (zoom) {
            if (zoom > 0) {
                set((state) => ({...state, zoom}));
            }
        },
        increaseZoom: function () {
            const currentZoom = get().zoom;

            for (const step of ZOOM_STEPS) {
                if (currentZoom < step) {
                    get().setZoom(step);
                    break;
                }
            }
        },
        decreaseZoom: function () {
            const currentZoom = get().zoom;
            const reverseSteps = ZOOM_STEPS.slice().reverse();

            for (const step of reverseSteps) {
                if (currentZoom > step) {
                    get().setZoom(step);
                    break;
                }
            }
        },

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
