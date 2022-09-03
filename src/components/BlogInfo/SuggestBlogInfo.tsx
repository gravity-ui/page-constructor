import React, {useCallback, useState} from 'react';
import block from 'bem-cn-lite';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1444

import {BlogPostData} from '../../models/blog';

import {BlogDate} from './components/BlogDate';
import {BlogReadingTime} from './components/BlogReadingTime';
import {BlogSave} from './components/BlogSave';

import './BlogInfo.scss';

const b = block('blog-info');

export interface SuggestBlogInfoProps
    extends Pick<BlogPostData, 'blogPostId' | 'date' | 'readingTime' | 'hasUserLike' | 'likes'> {
    size?: 's' | 'm';
    dataQa?: string;
    // delete this prop after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    isModernIcon?: boolean;
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
    hasUserLike,
    likes,
    dataQa,
    size = 's',
    isModernIcon,
}) => {
    const [like, setLike] = useState(hasUserLike);
    const [likesCount, setLikesCount] = useState(likes ?? 0);

    const handleUserLike = useCallback(() => {
        let likesCountBuffer = likesCount;

        if (like) {
            likesCountBuffer--;
        } else {
            likesCountBuffer++;
        }

        if (likesCountBuffer < 0) {
            likesCountBuffer = 0;
        }

        setLike(!like);
        setLikesCount(likesCountBuffer);
    }, [like, likesCount]);

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
                    hasUserLike={like ?? false}
                    handleUserLike={handleUserLike}
                    dataQa={dataQa}
                    size={size}
                    isModernIcon={isModernIcon}
                />
            )}
        </div>
    );
};
