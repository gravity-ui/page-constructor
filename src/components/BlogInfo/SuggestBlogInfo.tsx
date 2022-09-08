import React from 'react';
import block from 'bem-cn-lite';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1444

import {BlogPostData, ToggleLikeCallbackType} from '../../models/blog';

import {useLikes} from '../../hooks/useLikes';

import {BlogDate} from './components/BlogDate';
import {BlogReadingTime} from './components/BlogReadingTime';
import {BlogSave} from './components/BlogSave';

import './BlogInfo.scss';

const b = block('blog-info');

export interface SuggestBlogInfoProps
    extends Pick<BlogPostData, 'blogPostId' | 'date' | 'readingTime' | 'hasUserLike'> {
    size?: 's' | 'm';
    dataQa?: string;
    // delete this prop after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    isModernIcon?: boolean;
    likes: {
        likesCount: number;
        hasUserLike: boolean;
        toggleLike: ToggleLikeCallbackType;
    };
}

/**
 * Suggest blog card info component
 *
 * @param blogPostId - post id
 * @param date - post create date
 * @param readingTime - post reading time
 * @param hasUserLike - flag that the user liked the post
 * @param likes - likes count
 * @param dataQa - test-attr
 * @param size - text size
 * @param isModernIcon - flag what we need render 'bookmark' icon
 *
 * @returns jsx
 */
export const SuggestBlogInfo: React.FC<SuggestBlogInfoProps> = ({
    blogPostId,
    date,
    readingTime,
    likes,
    dataQa,
    size = 's',
    isModernIcon,
}) => {
    const {hasUserLike, likesCount, handleLike} = useLikes({
        hasLike: likes?.hasUserLike,
        count: likes?.likesCount,
        toggleLikeCallback: likes.toggleLike,
        postId: blogPostId,
    });

    return (
        <div className={b('container')}>
            <div className={b('suggest-container')}>
                {date && <BlogDate date={date} size={size} />}
                {readingTime && <BlogReadingTime readingTime={readingTime} size={size} />}
            </div>
            {blogPostId && (
                <BlogSave
                    postId={blogPostId}
                    title={likesCount}
                    hasUserLike={hasUserLike}
                    handleUserLike={handleLike}
                    dataQa={dataQa}
                    size={size}
                    isModernIcon={isModernIcon}
                />
            )}
        </div>
    );
};
