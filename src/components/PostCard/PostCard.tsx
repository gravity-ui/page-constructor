import React from 'react';
import block from 'bem-cn-lite';

import {CardBase, YFMWrapper, MetrikaGoal} from '@yandex-data-ui/page-constructor';
import {HTML} from '@doc-tools/components';

import {BlogSuggestMetaBlock} from 'components/BlogMeta/BlogMeta';
import {BlogPostData} from 'models/blog';

import './PostCard.scss';

const b = block('BlogPostCard');

type PostCardProps = {
    post: BlogPostData;
    fullWidth?: boolean;
    showTag?: boolean;
    size?: 's' | 'm';
    metrikaGoals?: MetrikaGoal;
    // delete this prop after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    useModernIcon?: boolean;
};

export const PostCard: React.FC<PostCardProps> = ({
    post,
    metrikaGoals,
    fullWidth = false,
    size = 's',
    showTag = false,
    useModernIcon,
}) => {
    const title = post?.title || post.htmlTitle || post.textTitle;

    return (
        <CardBase url={post.url} metrikaGoals={metrikaGoals} className={b('card', {fullWidth})}>
            <CardBase.Header image={post.image} className={b('header', {fullWidth})}>
                <div className={b('image-container')} data-qa="blog-suggest-header" />
            </CardBase.Header>
            <CardBase.Content>
                {showTag && post?.tags?.[0]?.name && (
                    <div className={b('tag', {size})}>{post.tags[0].name}</div>
                )}
                {title && (
                    <h4 className={b('title', {size})}>
                        <HTML>{title}</HTML>
                    </h4>
                )}
                {post.description && (
                    <YFMWrapper
                        content={post.description}
                        modifiers={{
                            blog: size === 'm',
                        }}
                    />
                )}
            </CardBase.Content>
            <CardBase.Footer>
                <BlogSuggestMetaBlock
                    post={post}
                    dataQa="blog-suggest-block"
                    size={size}
                    useModernIcon={useModernIcon}
                />
            </CardBase.Footer>
        </CardBase>
    );
};
