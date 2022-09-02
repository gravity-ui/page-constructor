import {
    ContentBlockProps,
    HeaderBreadCrumbsProps,
    isNewMetrikaFormat,
    MetrikaGoal,
    NewMetrikaGoal,
} from '@yandex-data-ui/page-constructor';

import {i18, BlogKeyset} from 'src/i18n';

// import {getTagFilterUrl, getTags} from 'units/blog/utils';
import {BlogPostTagExtended} from 'models/blog';
import {
    CONTENT_DEFAULT_COL_SIZES,
    CONTENT_DEFAULT_SIZE,
    CONTENT_DEFAULT_THEME,
} from 'blocks/constants';

import _ from 'lodash';
// TODO fix https://st.yandex-team.ru/ORION-1442
// import {CloudListTag} from 'components/tags/CloudTagList/CloudTagList';
// import {addBlogPostLike, removeBlogPostLike} from './api';

type CloudListTagStub = {};

export const getTags = _.memoize((tags: BlogPostTagExtended[]) => {
    return tags.map(({slug, ...tag}) => {
        const queryParams = new URLSearchParams();
        queryParams.set('tags', slug);

        return {
            ...tag,
            id: slug,
            url: `/blog?${queryParams}`,
        } as CloudListTagStub;
    });
});

const stub = (postId: number) => postId;

export const postLikeStatus = _.debounce((postId: number, hasUserLike: boolean) => {
    (hasUserLike ? stub : stub)(postId);
}, 300);

export const getTagFilterUrl = (tagId: string | number) => {
    return '/blog?tags=' + tagId;
};

export const checkContentDefaults = (contentData: ContentBlockProps) => {
    contentData.size = contentData.size || CONTENT_DEFAULT_SIZE;
    contentData.colSizes = contentData.colSizes || CONTENT_DEFAULT_COL_SIZES;
    contentData.theme = contentData.theme || CONTENT_DEFAULT_THEME;
};

type GetBlogBreadcrumbsProps = {
    tags?: BlogPostTagExtended[];
};

export const getBlogBreadcrumbs = ({tags}: GetBlogBreadcrumbsProps) => {
    const breadcrumbs: HeaderBreadCrumbsProps = {
        items: [{text: i18(BlogKeyset.TitleBreadcrumbsBlog), url: '/blog'}],
        theme: 'light',
    };

    if (tags?.length) {
        const localizedTags = getTags(tags);
        const tag = localizedTags[0];
        // @ts-ignore
        breadcrumbs.items.push({text: tag.name, url: getTagFilterUrl(tag.id)});
    }

    return breadcrumbs;
};

export const isMetrikaExist = (goal: NewMetrikaGoal, existGoals: NewMetrikaGoal[]) => {
    return Boolean(existGoals.find((existGoal) => goal.name === existGoal.name));
};

export const getBlogElementMetrika = (
    blogCustomGoal: NewMetrikaGoal,
    existingGoals?: MetrikaGoal,
) => {
    if (existingGoals) {
        if (isNewMetrikaFormat(existingGoals) && !isMetrikaExist(blogCustomGoal, existingGoals)) {
            const goals = [...existingGoals];
            goals.push(blogCustomGoal);

            return goals;
        }

        return existingGoals;
    } else {
        return [blogCustomGoal];
    }
};
