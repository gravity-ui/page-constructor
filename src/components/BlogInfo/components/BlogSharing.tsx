import React, {useContext} from 'react';
import block from 'bem-cn-lite';

// TODO refactor in https://st.yandex-team.ru/ORION-1444

import {LayoutDirections} from '@yandex-data-ui/common/build/esm/components/ShareTooltip/constants';
import {ShareTooltip, ShareSocialNetwork} from '@yandex-cloud/uikit';

import {RouterContext} from '../../../contexts/RouterContext';
import {MobileContext} from '../../../contexts/MobileContext';

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
    const router = useContext(RouterContext);
    const isMobile = useContext(MobileContext);

    const handleMetrika = () => {
        metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
    };

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
                    direction={LayoutDirections.column as any}
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
