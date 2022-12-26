import React, {useContext} from 'react';

import {ShareTooltip} from '@gravity-ui/uikit';

import {MobileContext} from '../../../contexts/MobileContext';
import {RouterContext} from '../../../contexts/RouterContext';
import {PostPageContext} from '../../../contexts/PostPageContext';

import {i18, Keyset} from '../../../i18n';

import {getAbsolutePath} from '../../../utils/common';
import {block} from '../../../utils/cn';

import {MetrikaCounter} from '../../../counters/utils';

// @ts-ignore
import metrika from '../../../counters/metrika.js';

import {ShareArrowUp} from '../../../icons/ShareArrowUp';

import '../PostInfo.scss';

const b = block('post-info');

type SharingProps = {
    theme?: 'light' | 'dark';
    metrikaGoal?: string;
};

export const Sharing: React.FC<SharingProps> = ({theme, metrikaGoal}) => {
    const router = useContext(RouterContext);
    const isMobile = useContext(MobileContext);
    const {shareOptions} = useContext(PostPageContext);

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
                    direction={'column' as ShareTooltip['props']['direction']}
                    buttonTitle={i18(Keyset.ActionShare)}
                    customIcon={ShareArrowUp}
                    placement="bottom"
                    openByHover={false}
                    socialNets={shareOptions}
                    handleMetrika={handleMetrika}
                />
            </span>
        </div>
    );
};
