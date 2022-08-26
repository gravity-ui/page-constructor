import React, {useContext} from 'react';

import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {SliderBlock} from '@yandex-data-ui/page-constructor';

import {BlogWrapper, PaddingSize} from 'components/BlogWrapper/BlogWrapper';
import {PostCard} from 'components/PostCard/PostCard';

import {BlogPostData} from 'models/blog';

import {BlogPageContext} from 'contexts/BlogPageContext';
import {TranslationContext} from 'contexts/TranslationContext';

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
    // TODO refactor in https://st.yandex-team.ru/ORION-1450
    const {i18n} = useContext(TranslationContext);
    const {suggestedPosts} = useContext(BlogPageContext);

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <SliderBlock
                slidesToShow={{xl: 3, lg: 2, sm: 1}}
                title={{text: i18n('blog', 'title_suggest')}}
            >
                {suggestedPosts.map((post) => (
                    <PostCard key={post.id} metrikaGoals={metrikaGoals} post={post} />
                ))}
            </SliderBlock>
        </BlogWrapper>
    );
};
