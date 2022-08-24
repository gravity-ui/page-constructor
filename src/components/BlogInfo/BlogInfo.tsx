import React, {useContext} from 'react';
import block from 'bem-cn-lite';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1444
import {BlogPageContext} from 'contexts/BlogPageContext';

import {BlogPostData} from 'models/blog';

import {BlogDate} from './components/BlogDate';
import {BlogReadingTime} from './components/BlogReadingTime';
import {BlogSharing} from './components/BlogSharing';
import {BlogSave} from './components/BlogSave';

import './BlogInfo.scss';

const b = block('blog-info');

export type BlogMetrikaGoals = {
    sharing?: string;
    save?: string;
};

type BlogInfoProps = {
    postId: BlogPostData['id'];
    readingTime: BlogPostData['readingTime'];
    date: BlogPostData['date'];
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
export const BlogInfo: React.FC<BlogInfoProps> = ({
    date,
    readingTime,
    postId,
    theme = 'light',
    metrikaGoals,
    dataQa,
}) => {
    const {likes} = useContext(BlogPageContext);

    return (
        <div className={b('container', {theme})}>
            {date && <BlogDate date={date} />}
            {readingTime && <BlogReadingTime readingTime={readingTime} />}
            <BlogSharing metrikaGoal={metrikaGoals?.sharing} theme={theme} />
            {postId && likes && (
                <BlogSave
                    postId={postId}
                    title={likes.likesCount}
                    hasUserLike={likes.hasUserLike}
                    handleUserLike={likes.handleUserLike}
                    metrikaGoal={metrikaGoals?.save}
                    dataQa={dataQa}
                    theme={theme}
                />
            )}
        </div>
    );
};
