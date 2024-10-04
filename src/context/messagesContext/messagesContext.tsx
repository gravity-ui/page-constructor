/**
 * Context for sending messages between Editor and App
 * Same exist in Editor
 **/

import React from 'react';

import {StoreApi} from 'zustand';

import {Action} from '../../types/actions';

import {MessagesStore} from './store';
import {SendOptions} from './types';

export interface PostMessageContextProps {
    state?: StoreApi<MessagesStore>;
    sendMessage: (action: Action, options?: SendOptions) => void;
}

export const PostMessageContext = React.createContext<PostMessageContextProps>({
    sendMessage: () => {},
});
