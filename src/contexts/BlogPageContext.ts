import React from 'react';
import {ShareOptions} from '@gravity-ui/uikit';

import {BlogPostData} from '../models/blog';

export interface BlogPageContextProps {
    // Should we change Blog Context? https://st.yandex-team.ru/CLOUDFRONT-10460
    post: BlogPostData;
    suggestedPosts: BlogPostData[];
    likes?: {
        handleUserLike: () => void;
        hasUserLike: boolean;
        likesCount: number;
    };
    sharingSocialNetworks?: ShareOptions[];
}

export const BlogPageContext = React.createContext<BlogPageContextProps>(
    {} as BlogPageContextProps,
);
