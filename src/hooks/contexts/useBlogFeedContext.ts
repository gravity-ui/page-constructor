import {useContext} from 'react';

import {BlogFeedContext} from '../../contexts/BlogFeedContext';

export const useBlogFeedContext = () => {
    const blogContextData = useContext(BlogFeedContext);

    return blogContextData;
};
