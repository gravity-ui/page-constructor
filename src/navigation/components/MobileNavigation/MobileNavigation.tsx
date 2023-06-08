import React from 'react';

import {Portal} from '@gravity-ui/uikit';

import Foldable from '../../../components/Foldable/Foldable';
import {block} from '../../../utils';
import {ItemColumnName, MobileNavigationProps, NavigationLayout} from '../../models';
import {NavigationList} from '../NavigationList/NavigationList';

import './MobileNavigation.scss';

const b = block('mobile-navigation');

const MobileNavigation: React.FC<MobileNavigationProps> = ({
    isOpened,
    topItems,
    bottomItems,
    ...props
}) => {
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <Portal>
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
