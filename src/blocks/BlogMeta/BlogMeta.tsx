import React, {useContext} from 'react';
import block from 'bem-cn-lite';
import {HeaderBreadcrumbs, TextTheme} from '@yandex-data-ui/page-constructor';

import {BlogPageContext} from 'contexts/BlogPageContext';
import {TranslationContext} from 'contexts/TranslationContext';

import {BlogWrapper, PaddingSize} from 'components/BlogWrapper/BlogWrapper';
import {YFMWrapper} from 'components/YFMWrapper/YFMWrapper';
import {BlogMetaComponent, BlogMetrikaGoals} from 'components/BlogMeta/BlogMeta';
import {getBlogBreadcrumbs} from 'utils/blog';

import {BlogMetrikaGoalIds} from '../constants';

import 'styles/yfm.scss';
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
    const {i18n} = useContext(TranslationContext);

    const breadcrumbs = getBlogBreadcrumbs({
        tags: post?.tags,
        i18n,
    });

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
            {post?.title && (
                <YFMWrapper
                    content={post.title}
                    modifiers={{
                        blogBreadcrumbs: true,
                        resetPaddings: true,
                    }}
                />
            )}
            {post && (
                <BlogMetaComponent
                    post={post}
                    dataQa="blog-meta-block"
                    metrikaGoals={metrikaGoals}
                />
            )}
        </BlogWrapper>
    );
};
