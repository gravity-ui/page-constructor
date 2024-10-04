/**
 * Context for managing internal Editor states
 * Same exist in Editor
 **/

import React from 'react';

import {StoreApi} from 'zustand';

import {EditorStore} from './store';

export interface EditorContextProps {
    state?: StoreApi<EditorStore>;
    activeElement?: HTMLElement;
    setActiveElement: (element: HTMLElement) => void;
}

export const EditorContext = React.createContext<EditorContextProps>({setActiveElement: () => {}});
