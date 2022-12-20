import React from 'react';
import {ToggleLikeCallbackType} from '../models/common';

export interface LikesContextProps {
    toggleLike?: ToggleLikeCallbackType;
    hasLikes?: boolean;
}

export const LikesContext = React.createContext<LikesContextProps>({} as LikesContextProps);
