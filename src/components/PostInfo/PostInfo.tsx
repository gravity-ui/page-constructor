import React, {useContext} from 'react';

import {PostPageContext} from '../../contexts/PostPageContext';

import {PostData} from '../../models/common';

import {Date} from './components/Date';
import {ReadingTime} from './components/ReadingTime';
import {Sharing} from './components/Sharing';
import {Save} from './components/Save';

import {block} from '../../utils/cn';

import './PostInfo.scss';

const b = block('post-info');

export type BlogMetrikaGoals = {
    sharing?: string;
    save?: string;
};

type PostInfoProps = {
    postId: PostData['id'];
    readingTime: PostData['readingTime'];
    date: PostData['date'];
    theme?: 'light' | 'dark';
    metrikaGoals?: BlogMetrikaGoals;
    dataQa?: string;
};

/**
 *  Blog post info panel component
 *
 * @param postId - post id
 * @param readingTime - post reading time
 * @param date - post create date
 * @param theme - theme name
 * @param metrikaGoals - metrika goals name
 * @param dataQa - test-attr
 *
 * @returns jsx
 */
export const PostInfo: React.FC<PostInfoProps> = ({
    date,
    readingTime,
    postId,
    theme = 'light',
    metrikaGoals,
    dataQa,
}) => {
    const {likes} = useContext(PostPageContext);

    return (
        <div className={b('container', {theme})}>
            {date && <Date date={date} />}
            {readingTime && <ReadingTime readingTime={readingTime} />}
            <Sharing metrikaGoal={metrikaGoals?.sharing} theme={theme} />
            {likes && (
                <Save
                    postId={postId}
                    title={likes.likesCount}
                    hasUserLike={likes.hasUserLike}
                    handleUserLike={likes.handleUserLike}
                    metrikaGoal={metrikaGoals?.save}
                    theme={theme}
                    dataQa={dataQa}
                />
            )}
        </div>
    );
};
