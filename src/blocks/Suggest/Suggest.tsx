import React, {useContext} from 'react';

import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {SliderBlock} from '@gravity-ui/page-constructor';

import {i18, Keyset} from '../../i18n';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {PostCard} from '../../components/PostCard/PostCard';

import {PaddingsDirections, PaddingsYFMProps} from '../../models/paddings';
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
} & PaddingsYFMProps;

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
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
        >
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
