import React, {useContext, useMemo} from 'react';
import block from 'bem-cn-lite';

import {CardBase, YFMWrapper, MetrikaGoal} from '@yandex-data-ui/page-constructor';

import {BlogPageContext} from '../../contexts/BlogPageContext';

import {SuggestBlogInfo} from '../../components/BlogInfo/SuggestBlogInfo';
import {BlogPostData} from '../../models/blog';

import './PostCard.scss';

const b = block('BlogPostCard');

type PostCardProps = {
    post: BlogPostData;
    fullWidth?: boolean;
    showTag?: boolean;
    size?: 's' | 'm';
    metrikaGoals?: MetrikaGoal;
    // delete this prop after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    isModernIcon?: boolean;
};

export const PostCard: React.FC<PostCardProps> = ({
    post,
    metrikaGoals,
    fullWidth = false,
    size = 's',
    showTag = false,
    isModernIcon,
}) => {
    const {
        title: postTitle,
        htmlTitle,
        textTitle,
        blogPostId,
        id,
        date,
        readingTime,
        hasUserLike,
        likes,
        image,
        description,
        tags,
        url,
    } = post;

    const title = postTitle || htmlTitle || textTitle;

    const {toggleLike} = useContext(BlogPageContext);

    const likesProps = useMemo(
        () => ({
            hasUserLike,
            likesCount: likes,
            toggleLike,
        }),
        [hasUserLike, likes, toggleLike],
    );

    return (
        <CardBase url={url} metrikaGoals={metrikaGoals} className={b('card', {fullWidth})}>
            <CardBase.Header image={image} className={b('header', {fullWidth})}>
                <div className={b('image-container')} data-qa="blog-suggest-header" />
            </CardBase.Header>
            <CardBase.Content>
                {showTag && tags?.[0]?.name && (
                    <div className={b('tag', {size})}>{tags[0].name}</div>
                )}
                {title && (
                    <h4 className={b('title', {size})}>
                        <span>{title}</span>
                    </h4>
                )}
                {description && (
                    <YFMWrapper
                        content={description}
                        modifiers={{
                            blog: size === 'm',
                        }}
                    />
                )}
            </CardBase.Content>
            <CardBase.Footer>
                <SuggestBlogInfo
                    blogPostId={blogPostId || id}
                    date={date}
                    readingTime={readingTime}
                    hasUserLike={hasUserLike}
                    likes={likesProps}
                    dataQa="blog-suggest-block"
                    size={size}
                    isModernIcon={isModernIcon}
                />
            </CardBase.Footer>
        </CardBase>
    );
};
