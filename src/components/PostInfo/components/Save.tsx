import React, {useContext} from 'react';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1444

import {Icon} from '@gravity-ui/uikit';

import {postLikeStatus} from '../../../utils/common';
import {block} from '../../../utils/cn';

import {MetrikaCounter} from '../../../counters/utils';
// @ts-ignore
import metrika from '../../../counters/metrika.js';

import {Save as SaveIcon} from '../../../icons/Save';
import {SaveFilled} from '../../../icons/SaveFilled';
import {UserContext} from '../../../contexts/UserContext';

import '../PostInfo.scss';

const ICON_SIZE = 16;

const b = block('post-info');

type SaveProps = {
    title: string | number;
    postId: number;
    hasUserLike: boolean;
    handleUserLike: () => void;
    theme?: 'light' | 'dark';
    metrikaGoal?: string;
    dataQa?: string;
    size?: 's' | 'm';
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
 *
 * @returns jsx
 */
export const Save: React.FC<SaveProps> = ({
    title,
    postId,
    hasUserLike,
    handleUserLike,
    metrikaGoal,
    size,
    theme,
}) => {
    const {uid} = useContext(UserContext);

    return (
        <div
            className={b('item', {size})}
            onClick={(event) => {
                // both preventDefault and stopImmediatePropagation required to work properly
                // https://stackoverflow.com/questions/24415631/reactjs-syntheticevent-stoppropagation-only-works-with-react-events
                event.preventDefault();
                event.nativeEvent.stopImmediatePropagation();

                if (!uid) {
                    return;
                }

                postLikeStatus(postId, Boolean(hasUserLike));
                handleUserLike();
                metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
            }}
        >
            <div className={b('content', {cursor: Boolean(uid), theme})}>
                <span className={b('icon')}>
                    <Icon
                        data={hasUserLike ? SaveFilled : SaveIcon}
                        size={ICON_SIZE}
                        className={b({filled: Boolean(hasUserLike)})}
                    />
                </span>
                <span className={b('title', {cursor: Boolean(uid)})}>{title}</span>
            </div>
        </div>
    );
};
