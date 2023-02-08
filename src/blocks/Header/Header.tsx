import React, {useContext} from 'react';
import {HeaderBlock} from '@gravity-ui/page-constructor';

import {PostPageContext} from '../../contexts/PostPageContext';
import {LocaleContext} from '../../contexts/LocaleContext';

import {PostInfo, BlogMetrikaGoals} from '../../components/PostInfo/PostInfo';
import {Wrapper} from '../../components/Wrapper/Wrapper';

import {PaddingsDirections} from '../../models/paddings';
import {HeaderProps} from '../../models/blocks';

import {getBreadcrumbs} from '../../utils/common';

import {BlogMetrikaGoalIds} from '../../constants';

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

export const Header: React.FC<HeaderProps> = (props) => {
    const {theme, paddingTop, paddingBottom} = props;
    const {post} = useContext(PostPageContext);
    const {locale} = useContext(LocaleContext);

    const {description, title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBreadcrumbs({tags, pathPrefix: locale?.pathPrefix || ''});

    if (theme === 'dark' && breadcrumbs) {
        breadcrumbs.theme = 'dark';
    }

    breadcrumbs.metrikaGoals = breadcrumbsGoals;

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
        >
            <HeaderBlock
                {...props}
                title={title}
                description={description}
                breadcrumbs={breadcrumbs}
            >
                <PostInfo
                    postId={id}
                    date={date}
                    readingTime={readingTime}
                    metrikaGoals={metrikaGoals}
                    theme={theme}
                    dataQa="blog-header-meta-container"
                />
            </HeaderBlock>
        </Wrapper>
    );
};
