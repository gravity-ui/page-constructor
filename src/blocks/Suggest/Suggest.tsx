import React, {useContext} from 'react';

import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {SliderBlock} from '@gravity-ui/page-constructor';

import {i18, Keyset} from '../../i18n';

import {Wrapper, PaddingSize} from '../../components/Wrapper/Wrapper';
import {PostCard} from '../../components/PostCard/PostCard';

import {BlogPostData} from '../../models/common';

import {PostPageContext} from '../../contexts/PostPageContext';

import {BlogMetrikaGoalIds} from '../../constants';

const metrikaGoals = [
    {
        name: BlogMetrikaGoalIds.suggest,
        isCrossSite: true,
    },
];

type SuggestProps = {
    posts: BlogPostData[];
    paddingTop: PaddingSize;
    paddingBottom: PaddingSize;
};

export type SuggestFullProps = SuggestProps & ClassNameProps;

/**
 * Suggested posts block
 *
 * @param posts - suggested posts list
 * @param paddingTop - padding top code
 * @param paddingBottom - padding bottom code
 *
 * @returns -jsx
 */
export const Suggest: React.FC<SuggestFullProps> = ({paddingTop = 'l', paddingBottom = 'l'}) => {
    const {suggestedPosts} = useContext(PostPageContext);

    if (suggestedPosts.length === 0) {
        return null;
    }

    return (
        <Wrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <SliderBlock
                slidesToShow={{xl: 3, lg: 2, sm: 1}}
                title={{text: i18(Keyset.TitleSuggest)}}
            >
                {suggestedPosts.map((post) => (
                    <PostCard key={post.id} metrikaGoals={metrikaGoals} post={post} />
                ))}
            </SliderBlock>
        </Wrapper>
    );
};
