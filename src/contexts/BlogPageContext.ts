import React from 'react';
import {BlogPostData} from 'models/blog';

export interface BlogPageContextProps {
    // Should we change Blog Context? https://st.yandex-team.ru/CLOUDFRONT-10460
    post: BlogPostData;
    likes?: {
        handleUserLike: () => void;
        hasUserLike: boolean;
        likesCount: number;
    };
}

export const BlogPageContext = React.createContext<BlogPageContextProps>({});
