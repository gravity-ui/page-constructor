import React from 'react';
import {ShareSocialNetwork} from '@gravity-ui/uikit';

import {BlogPostData} from '../models/common';

export interface PostPageContextProps {
    // Should we change Blog Context? https://st.yandex-team.ru/CLOUDFRONT-10460
    post: BlogPostData;
    suggestedPosts: BlogPostData[];
    likes?: {
        handleUserLike: () => void;
        hasUserLike: boolean;
        likesCount: number;
    };
    sharingSocialNetworks?: ShareSocialNetwork[];
}

export const PostPageContext = React.createContext<PostPageContextProps>(
    {} as PostPageContextProps,
);
