/**
 * Context for managing internal Editor states
 * Same exist in PC
 **/

import React from 'react';

import {StoreApi} from 'zustand';

import {EditorStore} from './store';

export interface EditorContextProps {
    state?: StoreApi<EditorStore>;
}

export const EditorContext = React.createContext<EditorContextProps>({});
