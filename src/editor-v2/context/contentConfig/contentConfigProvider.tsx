import React, {PropsWithChildren, useRef} from 'react';

import {StoreApi} from 'zustand';

import {PageContent} from '../../../models';

import {ContentConfigContext} from './contentConfigContext';
import {ContentConfigStore, createContentConfigStore} from './store';

interface ContentConfigProviderProps extends PropsWithChildren {
    content: PageContent;
    onUpdate?: (pageContent: PageContent) => void;
}

export const ContentConfigProvider = ({
    content,
    onUpdate,
    children,
}: ContentConfigProviderProps) => {
    const storeRef = useRef<StoreApi<ContentConfigStore>>();

    if (!storeRef.current) {
        storeRef.current = createContentConfigStore({config: content});
        if (onUpdate) {
            storeRef.current?.subscribe((state) => onUpdate(state.config));
        }
    }

    return (
        <ContentConfigContext.Provider value={{state: storeRef.current}}>
            {children}
        </ContentConfigContext.Provider>
    );
};
