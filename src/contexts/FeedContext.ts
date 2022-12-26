import React from 'react';

import {PostData, Tag, SetQueryType, GetPostsType, Service} from '../models/common';

export interface FeedContextProps {
    posts?: PostData[];
    pinnedPost?: PostData;
    totalCount?: number;
    tags?: Tag[];
    services?: Service[];
    getPosts?: GetPostsType;
    setQuery?: SetQueryType;
    pageCountForShowSupportButtons?: number;
}

export const FeedContext = React.createContext<FeedContextProps>({} as FeedContextProps);
