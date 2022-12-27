import {ShareOptions} from '@gravity-ui/uikit';

import {Lang} from '../src/models/locale';

import post from './post.json';
import page from './page.json';
import suggestedPosts from './suggestedPosts.json';

/**
 * function for generate post page data,
 * example how to use data utils
 */
export const generatePostPageData = () => {
    const lang = Lang.En;
    const region = Lang.En;

    return {
        suggestedPosts,
        content: page.content,
        post,
        shareOptions: [
            ShareOptions.Twitter,
            ShareOptions.Facebook,
            ShareOptions.Telegram,
            ShareOptions.VK,
        ],
        likes: {
            hasUserLike: post.hasUserLike,
            likesCount: post.likes,
            toggleLike: ({postId}) => {
                console.log('toggle like on post --->', postId);
            },
        },
    };
};
