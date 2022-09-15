import {ServicePublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import React from 'react';
import {BlogPostData, BlogPostTagExtended} from '../models/blog';

export interface BlogFeedPageContextProps {
    posts?: BlogPostData[];
    pinnedPost?: BlogPostData;
    totalCount?: number;
    tags?: BlogPostTagExtended[];
    services?: ServicePublic[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBlogPosts?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setQueryParams?: any;
}

export const BlogFeedContext = React.createContext<BlogFeedPageContextProps>({});
