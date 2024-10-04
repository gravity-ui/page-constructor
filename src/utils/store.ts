import {StoreApi, create} from 'zustand';
import {devtools} from 'zustand/middleware';

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
            [['zustand/devtools', never], ['zustand/persist', State & Methods]]
        >(
            devtools((set, get) => ({
                ...initialState,
                ...overrideInitialState,
                ...methods(set, get),
            })),
        );
}
