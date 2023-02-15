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
            ShareOptions.LinkedIn,
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

export const getDefaultStoryArgs = () => {
    return {
        paddingBottom: 'l',
        paddingTop: 'l',
        text: 'Lorem ipsum dolor',
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_light.png',
    };
};

export const getVideoStoryArgs = () => {
    return {
        video: {
            src: [
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/video_8-12_white.webm',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/video_8-12_white.mp4',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/video_8-12_white.pn',
            ],
            loop: {
                start: 0,
            },
        },
        previewImg:
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_white.png',
    };
};

export const youtubeSrc = 'https://youtu.be/0Qd3T6skprA';
export const dataLensSrc = 'm2bzon9y39lck';
