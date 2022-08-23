import {transformPageContent} from 'data/transformPageContent';
import {createReadableContent} from 'data/createReadableContent';
import {transformPost} from 'data/transformPost';

import {Lang} from 'models/locale';

import postApi from './postApi.json';
import pageApi from './pageApi.json';

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
        post: postData,
        page: pageData,
    };
};
