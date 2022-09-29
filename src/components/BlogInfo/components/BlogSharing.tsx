/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import block from 'bem-cn-lite';

// TODO refactor in https://st.yandex-team.ru/ORION-1444

import {ShareTooltip, ShareSocialNetwork} from '@yandex-cloud/uikit';

import {useRouterContext} from '../../../hooks/contexts/useRouterContext';
import {useMobileContext} from '../../../hooks/contexts/useMobileContext';

import {i18, BlogKeyset} from '../../../i18n';

import {getAbsolutePath} from '../../../utils/common';

import {MetrikaCounter} from '../../../counters/utils';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1444
// @ts-ignore
import metrika from '../../../counters/metrika.js';

import {ShareArrowUp} from '../../../icons/ShareArrowUp';

import '../BlogInfo.scss';

const b = block('blog-info');

type BlogSharingProps = {
    theme?: 'light' | 'dark';
    metrikaGoal?: string;
};

export const BlogSharing: React.FC<BlogSharingProps> = ({theme, metrikaGoal}) => {
    const router = useRouterContext();
    const isMobile = useMobileContext();

    const handleMetrika = () => {
        metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
    };

    //TODO return enum for direction after update LayoutDirections import

    return (
        <div className={b('item')}>
            <span className={b('icon')}>
                <ShareTooltip
                    url={getAbsolutePath(router)}
                    className={b('share')}
                    iconClass={b('share-icon')}
                    switcherClassName={b('switcher', {theme})}
                    tooltipClassName={b('popup')}
                    useWebShareApi={isMobile}
                    direction={'column' as ShareTooltip['props']['direction']}
                    buttonTitle={i18(BlogKeyset.ActionShare)}
                    customIcon={ShareArrowUp}
                    placement="bottom"
                    openByHover={false}
                    socialNets={[ShareSocialNetwork.Telegram]}
                    handleMetrika={handleMetrika}
                />
            </span>
        </div>
    );
};
