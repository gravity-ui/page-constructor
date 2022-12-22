import React from 'react';

import {PostData, PostTag, SetQueryType, GetPostsType, Service} from '../models/common';

export interface FeedContextProps {
    posts?: PostData[];
    pinnedPost?: PostData;
    totalCount?: number;
    tags?: PostTag[];
    services?: Service[];
    getPosts?: GetPostsType;
    setQuery?: SetQueryType;
    pageCountForShowSupportButtons?: number;
}

export const FeedContext = React.createContext<FeedContextProps>({} as FeedContextProps);
