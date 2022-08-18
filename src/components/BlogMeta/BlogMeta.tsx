import React, {useCallback, useContext, useState} from 'react';
import block from 'bem-cn-lite';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1432

import {LayoutDirections} from '@yandex-data-ui/common/build/esm/components/ShareTooltip/constants';
import {Icon, ShareTooltip, ShareSocialNetwork} from '@yandex-cloud/uikit';

import {TranslationContext} from 'contexts/TranslationContext';
import {RouterContext} from 'contexts/RouterContext';
import {MobileContext} from 'contexts/MobileContext';
// import {LocaleContext} from 'contexts/LocaleContext';
import {BlogPageContext} from 'contexts/BlogPageContext';

import {postLikeStatus} from 'utils/blog';

import {getAbsolutePath} from 'utils/common';
import {format} from 'utils/date';

import {BlogPostData} from 'models/blog';

import {MetrikaCounter} from 'counters/utils';
// @ts-ignore
import metrika from 'counters/metrika.js';

import shareIcon from 'icons/share-arrow-up.svg';
import timeIcon from 'icons/time.svg';
import savedIcon from 'icons/save.svg';
import filledSavedIcon from 'icons/save-filled.svg';
// delete theese icons after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
import likeIcon from 'icons/like-outlined.svg';
import filledLikeIcon from 'icons/like-filled.svg';

import './BlogMeta.scss';

const b = block('blog-meta');

type MetaSize = 's' | 'm';

type BlogMetaDateProps = {
    date: string | number;
    size?: MetaSize;
};

export const BlogMetaDate: React.FunctionComponent<BlogMetaDateProps> = (props) => {
    const {date, size = 's'} = props;
    // const {locale} = useContext(LocaleContext); //TODO add locale in context

    return <div className={b('meta-item', {size})}>{format(date, 'longDate', 'ru-Ru')}</div>; //TODO add live data
};

type BlogMetaReadingTimeProps = {
    readingTime: number;
    size?: MetaSize;
};

export const BlogMetaReadingTime: React.FunctionComponent<BlogMetaReadingTimeProps> = (props) => {
    const {readingTime, size = 's'} = props;
    const {i18n} = useContext(TranslationContext);

    return (
        <div className={b('meta-item', {size})}>
            <span className={b('meta-icon')}>
                <Icon data={timeIcon} size={16} className={b('icon-color')} />
            </span>
            {i18n('blog', 'context-reading_time', {count: readingTime})}
        </div>
    );
};

type BlogMetaSharingProps = {
    theme?: 'light' | 'dark';
    metrikaGoal?: string;
};

export const BlogMetaSharing: React.FunctionComponent<BlogMetaSharingProps> = ({
    theme,
    metrikaGoal,
}) => {
    const {i18n} = useContext(TranslationContext);
    const router = useContext(RouterContext);
    const isMobile = useContext(MobileContext);

    const handleMetrika = () => {
        metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
    };

    return (
        <div className={b('meta-item')}>
            <span className={b('meta-icon')}>
                <ShareTooltip
                    url={getAbsolutePath(router)}
                    className={b('share')}
                    iconClass={b('share-icon')}
                    switcherClassName={b('switcher', {theme})}
                    tooltipClassName={b('popup')}
                    useWebShareApi={isMobile}
                    direction={LayoutDirections.column}
                    buttonTitle={i18n('blog', 'action-share')}
                    customIcon={shareIcon}
                    placement="bottom"
                    openByHover={false}
                    socialNets={[ShareSocialNetwork.Telegram]}
                    handleMetrika={handleMetrika}
                />
            </span>
        </div>
    );
};

type BlogMetaSaveProps = {
    title: string | number;
    postId: number;
    hasUserLike: boolean;
    handleUserLike: () => void;
    theme?: 'light' | 'dark';
    metrikaGoal?: string;
    dataQa?: string;
    size?: MetaSize;
    // delete this prop after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    useModernIcon?: boolean;
};

export const BlogMetaSave: React.FunctionComponent<BlogMetaSaveProps> = (props) => {
    const {
        title,
        postId,
        hasUserLike,
        handleUserLike,
        metrikaGoal,
        dataQa,
        size,
        theme,
        useModernIcon,
    } = props;

    // delete this icons selection after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    const icon = useModernIcon ? savedIcon : likeIcon;
    const filledIcon = useModernIcon ? filledSavedIcon : filledLikeIcon;

    return (
        <div
            className={b('meta-item', {size})}
            onClick={(event) => {
                // both preventDefault and stopImmediatePropagation required to work properly
                // https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events
                event.preventDefault();
                event.nativeEvent.stopImmediatePropagation();
                postLikeStatus(postId, Boolean(hasUserLike));
                handleUserLike();
                metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
            }}
            data-qa={`${dataQa ? dataQa + '-' : ''}save`}
        >
            <div className={b('meta-content', {cursor: true, theme})}>
                <span className={b('meta-icon')}>
                    <Icon
                        data={hasUserLike ? filledIcon : icon}
                        size={16}
                        className={b({filled: Boolean(hasUserLike)})}
                    />
                </span>
                <span className={b('meta-title')}>{title}</span>
            </div>
        </div>
    );
};

export type BlogSuggestMetaBlockProps = {
    post: BlogPostData;
    size?: MetaSize;
    dataQa?: string;
    // delete this prop after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    useModernIcon?: boolean;
};

export const BlogSuggestMetaBlock: React.FunctionComponent<BlogSuggestMetaBlockProps> = (props) => {
    const {
        post: {blogPostId, date, readingTime, hasUserLike, likes},
        dataQa,
        size = 's',
        useModernIcon,
    } = props;

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
        <div className={b('meta-container')}>
            <div className={b('meta-suggest-container')}>
                {date && <BlogMetaDate date={date} size={size} />}
                {readingTime && <BlogMetaReadingTime readingTime={readingTime} size={size} />}
            </div>
            {blogPostId && (
                <BlogMetaSave
                    postId={blogPostId}
                    title={likesCount}
                    hasUserLike={like ?? false}
                    handleUserLike={handleUserLike.bind(this)}
                    dataQa={dataQa}
                    size={size}
                    useModernIcon={useModernIcon}
                />
            )}
        </div>
    );
};

export type BlogMetrikaGoals = {
    sharing?: string;
    save?: string;
};

type BlogMetaComponentProps = {
    post: BlogPostData;
    theme?: 'light' | 'dark';
    metrikaGoals?: BlogMetrikaGoals;
    dataQa?: string;
};

export const BlogMetaComponent: React.FunctionComponent<BlogMetaComponentProps> = ({
    post,
    theme = 'light',
    metrikaGoals,
    dataQa,
}) => {
    const {likes} = useContext(BlogPageContext);

    const {date, readingTime} = post;

    return (
        <div className={b('meta-container', {theme})}>
            {date && <BlogMetaDate date={date} />}
            {readingTime && <BlogMetaReadingTime readingTime={readingTime} />}
            <BlogMetaSharing metrikaGoal={metrikaGoals?.sharing} theme={theme} />
            {post.id && likes && (
                <BlogMetaSave
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
