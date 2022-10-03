import {ServicePublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import React from 'react';

import {BlogPostData, BlogPostTagExtended, GetBlogPostsType} from '../models/blog';

export interface BlogFeedPageContextProps {
    posts?: BlogPostData[];
    pinnedPost?: BlogPostData;
    totalCount?: number;
    tags?: BlogPostTagExtended[];
    services?: ServicePublic[];
    getBlogPosts?: GetBlogPostsType;
}

export const BlogFeedContext = React.createContext<BlogFeedPageContextProps>(
    {} as BlogFeedPageContextProps,
);
