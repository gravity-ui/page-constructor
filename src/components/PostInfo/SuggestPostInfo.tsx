import React from 'react';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1444

import {BlogPostData, ToggleLikeCallbackType} from '../../models/common';

import {useLikes} from '../../hooks/useLikes';

import {Date} from './components/Date';
import {ReadingTime} from './components/ReadingTime';
import {Save} from './components/Save';

import {block} from '../../utils/cn';

import './PostInfo.scss';

const b = block('post-info');

export interface SuggestPostInfoProps
    extends Pick<BlogPostData, 'blogPostId' | 'date' | 'readingTime' | 'hasUserLike'> {
    size?: 's' | 'm';
    dataQa?: string;
    likes?: {
        likesCount?: number;
        hasUserLike?: boolean;
        toggleLike?: ToggleLikeCallbackType;
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
export const SuggestPostInfo: React.FC<SuggestPostInfoProps> = ({
    blogPostId,
    date,
    readingTime,
    likes,
    size = 's',
    dataQa,
}) => {
    const {hasUserLike, likesCount, handleLike} = useLikes({
        hasLike: likes?.hasUserLike,
        count: likes?.likesCount,
        toggleLikeCallback: likes?.toggleLike,
        postId: blogPostId,
    });

    return (
        <div className={b('container')}>
            <div className={b('suggest-container')}>
                {date && <Date date={date} size={size} />}
                {readingTime && <ReadingTime readingTime={readingTime} size={size} />}
            </div>
            {likes && blogPostId && (
                <Save
                    postId={blogPostId}
                    title={likesCount}
                    hasUserLike={hasUserLike}
                    handleUserLike={handleLike}
                    size={size}
                    dataQa={dataQa}
                />
            )}
        </div>
    );
};
