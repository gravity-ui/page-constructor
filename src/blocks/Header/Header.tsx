import React, {useContext, useMemo} from 'react';
import {HeaderBlock, HeaderBlockProps} from '@gravity-ui/page-constructor';

import {PostPageContext} from '../../contexts/PostPageContext';

import {PostInfo, BlogMetrikaGoals} from '../../components/PostInfo/PostInfo';
import {Wrapper, PaddingSize} from '../../components/Wrapper/Wrapper';

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

export type HeaderProps = HeaderBlockProps & {
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const Header: React.FC<HeaderProps> = (props) => {
    const {theme, paddingTop, paddingBottom} = props;
    const {post} = useContext(PostPageContext);

    const {description, title, id, date, readingTime, tags} = post;

    const breadcrumbs = getBreadcrumbs({tags});

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
        <Wrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <HeaderBlock {...headerProps}>
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
