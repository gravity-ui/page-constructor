import React, {useContext} from 'react';
import {HeaderBreadcrumbs, TextTheme, YFMWrapper} from '@gravity-ui/page-constructor';

import {PostPageContext} from '../../contexts/PostPageContext';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {PostInfo, BlogMetrikaGoals} from '../../components/PostInfo/PostInfo';

import {PaddingsDirections, PaddingSize} from '../../models/paddings';

import {getBreadcrumbs} from '../../utils/common';

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

    const breadcrumbs = getBreadcrumbs({tags});

    breadcrumbs.metrikaGoals = breadcrumbsGoals;

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
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
                <PostInfo
                    postId={id}
                    date={date}
                    readingTime={readingTime}
                    metrikaGoals={metrikaGoals}
                    dataQa="blog-meta-block"
                />
            )}
        </Wrapper>
    );
};
