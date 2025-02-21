import {StoreApi, create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';

export function initializeStore<State extends {}, Methods extends {} = {}>(
    initialState: State,
    methods: (
        set: StoreApi<State & Methods>['setState'],
        get: StoreApi<State & Methods>['getState'],
    ) => Methods,
) {
    return (overrideInitialState?: Partial<State>) => {
        return create<
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
                        ...methods(set, get),
                    };
                }),
            ),
        );
    };
}

export const removeFn = (object: object) => {
    return JSON.parse(JSON.stringify(object));
};
