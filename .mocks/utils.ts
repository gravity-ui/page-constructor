import {transformPageContent} from '../src/data/transformPageContent';
import {createReadableContent} from '../src/data/createReadableContent';
import {sanitizeMeta} from '../src/data/sanitizeMeta';
import {transformPost} from '../src/data/transformPost';

import {Lang} from '../src/models/locale';

import postApi from './postApi.json';
import pageApi from './pageApi.json';
import metaData from './metaData.json';
import suggestedPosts from './suggestedPosts.json';

/**
 * function for generate post page data,
 * example how to use data utils
 */
export const generatePostPageData = () => {
    const lang = Lang.Ru;
    const region = Lang.Ru;

    const preparedPostData = transformPost(postApi, lang);

    const transformedPageContent = transformPageContent({content: pageApi.content, lang, region});

    const readableContent = createReadableContent({blocks: transformedPageContent.blocks});

    const pageData = {
        ...pageApi,
        content: transformedPageContent,
    };

    const postData = {
        ...preparedPostData,
        content: readableContent,
    };

    return {
        metaData: sanitizeMeta(metaData),
        suggestedPosts,
        content: pageData.content,
        post: postData,
        likes: {
            hasUserLike: postData.hasUserLike,
            likesCount: postData.likes,
            toggleLike: () => {
                console.log('toggle like');
            },
        },
    };
};
