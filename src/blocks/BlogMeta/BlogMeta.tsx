import React, {useContext} from 'react';
import block from 'bem-cn-lite';
import {HeaderBreadcrumbs, TextTheme, YFMWrapper} from '@yandex-data-ui/page-constructor';

import {BlogPageContext} from 'contexts/BlogPageContext';

import {BlogWrapper, PaddingSize} from 'components/BlogWrapper/BlogWrapper';
import {BlogInfo, BlogMetrikaGoals} from 'src/components/BlogInfo/BlogInfo';
import {getBlogBreadcrumbs} from 'utils/blog';

import {BlogMetrikaGoalIds} from '../constants';

import './BlogMeta.scss';

const b = block('BlogMetaBlock');

type MetaBlockProps = {
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
    locale: string;
    theme?: TextTheme;
};

export type MetaBlockFullProps = MetaBlockProps;

const metrikaGoals: BlogMetrikaGoals = {
    sharing: BlogMetrikaGoalIds.shareBottom,
    save: BlogMetrikaGoalIds.saveBottom,
};

const breadcrumbsGoals = [
    {
        name: BlogMetrikaGoalIds.breadcrumbsBottom,
        isCrossSite: true,
    },
];

export const MetaBlock: React.FC<MetaBlockFullProps> = (props) => {
    const {paddingTop = 'l', paddingBottom = 'l', theme = 'light'} = props;
    const {post} = useContext(BlogPageContext);

    const {title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBlogBreadcrumbs({tags});

    breadcrumbs.metrikaGoals = breadcrumbsGoals;

    return (
        <BlogWrapper
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            dataQa="blog-meta-content"
        >
            {breadcrumbs && (
                <HeaderBreadcrumbs
                    items={breadcrumbs.items}
                    className={b('breadcrumbs')}
                    theme={theme}
                    metrikaGoals={breadcrumbs.metrikaGoals}
                />
            )}
            {title && (
                <YFMWrapper
                    content={title}
                    modifiers={{
                        blogBreadcrumbs: true,
                        resetPaddings: true,
                    }}
                />
            )}
            {post && (
                <BlogInfo
                    postId={id}
                    date={date}
                    readingTime={readingTime}
                    dataQa="blog-meta-block"
                    metrikaGoals={metrikaGoals}
                />
            )}
        </BlogWrapper>
    );
};
