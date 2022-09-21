import React from 'react';
import {BlogPostData, ToggleLikeCallbackType} from '../models/blog';

export interface BlogPageContextProps {
    // Should we change Blog Context? https://st.yandex-team.ru/CLOUDFRONT-10460
    post: BlogPostData;
    suggestedPosts: BlogPostData[];
    likes?: {
        handleUserLike: () => void;
        hasUserLike: boolean;
        likesCount: number;
    };
    toggleLike?: ToggleLikeCallbackType;
    hasLikes?: boolean;
}

export const BlogPageContext = React.createContext<BlogPageContextProps>(
    {} as BlogPageContextProps,
);
