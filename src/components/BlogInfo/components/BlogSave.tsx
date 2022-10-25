import React from 'react';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1444

import {Icon} from '@gravity-ui/uikit';

import {postLikeStatus} from '../../../utils/blog';

import {MetrikaCounter} from '../../../counters/utils';
// @ts-ignore
import metrika from '../../../counters/metrika.js';

import {Save} from '../../../icons/Save';
import {SaveFilled} from '../../../icons/SaveFilled';
import {Like} from '../../../icons/Like';
import {LikeFilled} from '../../../icons/LikeFilled';

import {block} from '../../../utils/cn';

import '../BlogInfo.scss';

const ICON_SIZE = 16;

const b = block('blog-info');

type BlogSaveProps = {
    title: string | number;
    postId: number;
    hasUserLike: boolean;
    handleUserLike: () => void;
    theme?: 'light' | 'dark';
    metrikaGoal?: string;
    dataQa?: string;
    size?: 's' | 'm';
    // delete this prop after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    isModernIcon?: boolean;
};

/**
 * Components for 'save' blog UI-component
 *
 * @param title - post title
 * @param postId - post id
 * @param hasUserLike - flag what blog has like from current user
 * @param metrikaGoal - metrika goal name
 * @param dataQa - test-attr
 * @param size - text size
 * @param isModernIcon - flag what we need render 'bookmark' icon
 *
 * @returns jsx
 */
export const BlogSave: React.FC<BlogSaveProps> = ({
    title,
    postId,
    hasUserLike,
    handleUserLike,
    metrikaGoal,
    dataQa,
    size,
    theme,
    isModernIcon,
}) => {
    // delete this icons selection after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    const icon = isModernIcon ? Save : Like;
    const filledIcon = isModernIcon ? SaveFilled : LikeFilled;

    return (
        <div
            className={b('item', {size})}
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
            <div className={b('content', {cursor: true, theme})}>
                <span className={b('icon')}>
                    <Icon
                        data={hasUserLike ? filledIcon : icon}
                        size={ICON_SIZE}
                        className={b({filled: Boolean(hasUserLike)})}
                    />
                </span>
                <span className={b('title')}>{title}</span>
            </div>
        </div>
    );
};
