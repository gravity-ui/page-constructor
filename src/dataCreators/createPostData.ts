import {
    typografToText,
    typografToHTML,
    yfmTransformer,
} from '@yandex-data-ui/page-constructor/server';

import {Lang} from 'models/locale';
import {BlogPostPageData, BlogPostData} from 'models/blog';

import {transformPageContent} from './transformPageContent';
import {createReadableContent} from './createReadableContent';

type CreatePostPagePropsType = {
    postData: any;
    pageData: any;
    lang: Lang;
    region: string;
};

const transformPostTags = (tags: any) =>
    tags.map(({locales, ...rest}: any) => ({
        ...rest,
        ...locales[0],
    }));

/**
 * Func for transform post data
 *
 * @param postData - post data
 * @param lang - runtime language
 *
 * @returns -prepared post
 */
const transformPost = (
    {tags, title, metaTitle, description, ...post}: BlogPostData,
    lang: Lang,
) => ({
    ...post,
    title,
    tags: transformPostTags(tags),
    textTitle: typografToText(title, lang),
    htmlTitle: typografToHTML(title, lang),
    metaTitle: metaTitle || title,
    description: yfmTransformer(lang, description as string),
});

/**
 * Function for create post page data
 *
 * @param postData - post data
 * @param pageData - page data
 * @param lang - runtime lang
 * @param region - runtime app region
 *
 * @returns - post page data for UI
 */
export const createPostData = ({
    postData,
    pageData,
    lang,
    region,
}: CreatePostPagePropsType): BlogPostPageData => {
    if (!postData) {
        console.error('Post not found');

        return {} as BlogPostPageData;
    }

    let readableContent = '';

    const preparedPostData = transformPost(postData, lang);

    if (pageData?.content) {
        try {
            pageData.content = transformPageContent({content: pageData.content, lang, region});
            readableContent = createReadableContent({blocks: pageData.content.blocks});
        } catch (err) {
            console.error('Problem when transforming page content', {slug: postData.slug}, err);
            return {} as BlogPostPageData;
        }
    }

    return {
        post: {
            ...preparedPostData,
            content: readableContent,
        },
        page: pageData,
    };
};
