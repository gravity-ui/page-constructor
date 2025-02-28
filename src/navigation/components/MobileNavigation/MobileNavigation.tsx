import * as React from 'react';

import {Portal} from '@gravity-ui/uikit';

import Foldable from '../../../components/Foldable/Foldable';
import {useMount} from '../../../hooks';
import {block} from '../../../utils';
import {ItemColumnName, MobileNavigationProps, NavigationLayout} from '../../models';
import {NavigationList} from '../NavigationList/NavigationList';

import './MobileNavigation.scss';

const b = block('mobile-navigation');

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
    isOpened,
    topItems,
    bottomItems,
    portalContainer,
    ...props
}) => {
    const [isMounted, setIsMounted] = React.useState(false);

    useMount(() => setIsMounted(true));

    if (!isMounted) {
        return null;
    }

    return (
        <Portal container={portalContainer?.current ?? undefined}>
            <Foldable key={topItems?.length} className={b()} isOpened={Boolean(isOpened)}>
                <div className={b('wrapper')}>
                    {topItems && (
                        <NavigationList
                            className={b('rows')}
                            items={topItems}
                            column={ItemColumnName.Top}
                            menuLayout={NavigationLayout.Mobile}
                            {...props}
                        />
                    )}
                    {bottomItems && (
                        <NavigationList
                            className={b('rows')}
                            items={bottomItems}
                            column={ItemColumnName.Bottom}
                            menuLayout={NavigationLayout.Mobile}
                            {...props}
                        />
                    )}
                </div>
            </Foldable>
        </Portal>
    );
};

export default MobileNavigation;
