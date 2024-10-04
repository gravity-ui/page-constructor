import {StoreApi, create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';

export function initializeStore<State, Methods>(
    initialState: State,
    methods: (
        set: StoreApi<State & Methods>['setState'],
        get: StoreApi<State & Methods>['getState'],
    ) => Methods,
) {
    return (overrideInitialState?: Partial<State>) =>
        create<
            State & Methods,
            [['zustand/subscribeWithSelector', never], ['zustand/devtools', never]]
        >(
            subscribeWithSelector(
                devtools((set, get) => ({
                    ...initialState,
                    ...overrideInitialState,
                    ...methods(set, get),
                })),
            ),
        );
}
