import {ServicePublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import React from 'react';

import {BlogPostData, BlogPostTag, SetQueryType, GetBlogPostsType} from '../models/common';

export interface FeedContextProps {
    posts?: BlogPostData[];
    pinnedPost?: BlogPostData;
    totalCount?: number;
    tags?: BlogPostTag[];
    services?: ServicePublic[];
    getPosts?: GetBlogPostsType;
    setQuery?: SetQueryType;
    pageCountForShowSupportButtons?: number;
}

export const FeedContext = React.createContext<FeedContextProps>({} as FeedContextProps);
