import {ServicePublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import React from 'react';

import {BlogPostData, BlogPostTag, SetQueryType, GetBlogPostsType} from '../models/blog';

export interface FeedContextProps {
    posts?: BlogPostData[];
    pinnedPost?: BlogPostData;
    totalCount?: number;
    tags?: BlogPostTag[];
    services?: ServicePublic[];
    getBlogPosts?: GetBlogPostsType;
    setQuery?: SetQueryType;
    pageCountForShowSupportButtons?: number;
}

export const FeedContext = React.createContext<FeedContextProps>({} as FeedContextProps);
