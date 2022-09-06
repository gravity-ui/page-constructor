import React, {useContext} from 'react';

import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {SliderBlock} from '@yandex-data-ui/page-constructor';

import {i18, BlogKeyset} from '../../i18n';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';
import {PostCard} from '../../components/PostCard/PostCard';

import {BlogPostData} from '../../models/blog';

import {BlogPageContext} from '../../contexts/BlogPageContext';

import {BlogMetrikaGoalIds} from '../constants';

const metrikaGoals = [
    {
        name: BlogMetrikaGoalIds.suggest,
        isCrossSite: true,
    },
];

type SuggestBlockProps = {
    posts: BlogPostData[];
    paddingTop: PaddingSize;
    paddingBottom: PaddingSize;
};

export type SuggestBlockFullProps = SuggestBlockProps & ClassNameProps;

/**
 * Suggested posts block
 *
 * @param posts - suggested posts list
 * @param paddingTop - padding top code
 * @param paddingBottom - padding bottom code
 *
 * @returns -jsx
 */
export const BlogSuggestBlock: React.FC<SuggestBlockFullProps> = ({
    paddingTop = 'l',
    paddingBottom = 'l',
}) => {
    const {suggestedPosts} = useContext(BlogPageContext);

    if (suggestedPosts.length === 0) {
        return null;
    }

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <SliderBlock
                slidesToShow={{xl: 3, lg: 2, sm: 1}}
                title={{text: i18(BlogKeyset.TitleSuggest)}}
            >
                {suggestedPosts.map((post) => (
                    <PostCard key={post.id} metrikaGoals={metrikaGoals} post={post} />
                ))}
            </SliderBlock>
        </BlogWrapper>
    );
};
