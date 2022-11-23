import React, {useContext} from 'react';
import {HeaderBreadcrumbs, TextTheme, YFMWrapper} from '@gravity-ui/page-constructor';

import {BlogPageContext} from '../../contexts/BlogPageContext';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';
import {BlogInfo, BlogMetrikaGoals} from '../../components/BlogInfo/BlogInfo';
import {getBlogBreadcrumbs} from '../../utils/blog';

import {BlogMetrikaGoalIds} from '../../constants';

import {block} from '../../utils/cn';

import './Meta.scss';

const b = block('meta');

export type MetaProps = {
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
    locale: string;
    theme?: TextTheme;
};

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

export const Meta: React.FC<MetaProps> = (props) => {
    const {paddingTop = 'l', paddingBottom = 'l', theme = 'light'} = props;
    const {post} = useContext(BlogPageContext);

    const {title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBlogBreadcrumbs({tags});

    breadcrumbs.metrikaGoals = breadcrumbsGoals;

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
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
                    metrikaGoals={metrikaGoals}
                />
            )}
        </BlogWrapper>
    );
};
