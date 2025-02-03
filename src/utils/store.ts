import {StoreApi, create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';

export function initializeStore<State, Methods>(
    initialState: State,
    methods: (
        set: StoreApi<State & Methods>['setState'],
        get: StoreApi<State & Methods>['getState'],
        onStateUpdated?: () => void,
    ) => Methods,
) {
    return (overrideInitialState?: Partial<State>, onStateUpdated?: () => void) =>
        create<
            State & Methods,
            [
                ['zustand/subscribeWithSelector', State & Methods],
                ['zustand/devtools', never],
                ['zustand/persist', State & Methods],
            ]
        >(
            subscribeWithSelector(
                devtools((set, get) => {
                    return {
                        ...initialState,
                        ...overrideInitialState,
                        ...methods(set, get, onStateUpdated),
                    };
                }),
            ),
        );
}

export const removeFn = (object: object) => {
    return JSON.parse(JSON.stringify(object));
};
