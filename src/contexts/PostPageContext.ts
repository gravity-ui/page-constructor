import React from 'react';
import {ShareOptions} from '@gravity-ui/uikit';

import {PostData} from '../models/common';

export interface PostPageContextProps {
    post: PostData;
    suggestedPosts: PostData[];
    likes?: {
        handleUserLike: () => void;
        hasUserLike: boolean;
        likesCount: number;
    };
    shareOptions?: ShareOptions[];
}

export const PostPageContext = React.createContext<PostPageContextProps>(
    {} as PostPageContextProps,
);
