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
    post: BlogPostData;
    theme?: 'light' | 'dark';
    metrikaGoals?: BlogMetrikaGoals;
    dataQa?: string;
};

/**
 *  Blog post info panel component
 *
 * @param post - post info
 * @param theme - theme name
 * @param metrikaGoals - metrika goals name
 * @param dataQa - test-attr
 *
 * @returns jsx
 */
export const BlogInfo: React.FC<BlogInfoProps> = ({
    post,
    theme = 'light',
    metrikaGoals,
    dataQa,
}) => {
    const {likes} = useContext(BlogPageContext);

    const {date, readingTime} = post;

    return (
        <div className={b('container', {theme})}>
            {date && <BlogDate date={date} />}
            {readingTime && <BlogReadingTime readingTime={readingTime} />}
            <BlogSharing metrikaGoal={metrikaGoals?.sharing} theme={theme} />
            {post.id && likes && (
                <BlogSave
                    postId={post.id}
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
