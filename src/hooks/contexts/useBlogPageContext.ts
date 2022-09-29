import {useContext} from 'react';

import {BlogPageContext} from '../../contexts/BlogPageContext';

export const useBlogPageContext = () => {
    const blogPageContextData = useContext(BlogPageContext);

    return blogPageContextData;
};
