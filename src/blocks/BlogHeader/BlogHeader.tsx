import React, {useContext, useMemo} from 'react';
import {HeaderBlock, HeaderBlockProps} from '@yandex-data-ui/page-constructor';

import {BlogPageContext} from 'contexts/BlogPageContext';

import {BlogInfo, BlogMetrikaGoals} from 'src/components/BlogInfo/BlogInfo';
import {BlogWrapper, PaddingSize} from 'components/BlogWrapper/BlogWrapper';

import {getBlogBreadcrumbs} from 'utils/blog';

import {BlogMetrikaGoalIds} from '../constants';

const metrikaGoals: BlogMetrikaGoals = {
    sharing: BlogMetrikaGoalIds.shareTop,
    save: BlogMetrikaGoalIds.saveTop,
};

const breadcrumbsGoals = [
    {
        name: BlogMetrikaGoalIds.breadcrumbsTop,
        isCrossSite: true,
    },
];

export type BlogHeaderProps = HeaderBlockProps & {
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const BlogHeader: React.FC<BlogHeaderProps> = (props) => {
    const {theme, paddingTop, paddingBottom} = props;
    const {post} = useContext(BlogPageContext);

    const {description, title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBlogBreadcrumbs({tags});

    if (theme === 'dark' && breadcrumbs) {
        breadcrumbs.theme = 'dark';
    }

    breadcrumbs.metrikaGoals = breadcrumbsGoals;

    const headerProps = useMemo(
        () => ({
            ...props,
            title: title || '',
            description: description || '',
            breadcrumbs,
        }),
        [breadcrumbs, description, title, props],
    );

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <HeaderBlock {...headerProps}>
                <BlogInfo
                    postId={id}
                    date={date}
                    readingTime={readingTime}
                    metrikaGoals={metrikaGoals}
                    theme={theme}
                    dataQa="blog-header-meta-container"
                />
            </HeaderBlock>
        </BlogWrapper>
    );
};
