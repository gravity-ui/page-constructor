import React, {useContext} from 'react';
import {HeaderBreadcrumbs, TextTheme, YFMWrapper} from '@gravity-ui/page-constructor';

import {PostPageContext} from '../../contexts/PostPageContext';

import {Wrapper, PaddingSize} from '../../components/Wrapper/Wrapper';
import {PostInfo, BlogMetrikaGoals} from '../../components/PostInfo/PostInfo';
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
    const {post} = useContext(PostPageContext);

    const {title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBlogBreadcrumbs({tags});

    breadcrumbs.metrikaGoals = breadcrumbsGoals;

    return (
        <Wrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
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
                <PostInfo
                    postId={id}
                    date={date}
                    readingTime={readingTime}
                    metrikaGoals={metrikaGoals}
                />
            )}
        </Wrapper>
    );
};
