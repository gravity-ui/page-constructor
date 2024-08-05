import React from 'react';

import OverflowScroller from '../../../components/OverflowScroller/OverflowScroller';
import {block} from '../../../utils';
import {DesktopNavigationProps, ItemColumnName, NavigationLayout} from '../../models';
import Logo from '../Logo/Logo';
import {MobileMenuButton} from '../MobileMenuButton/MobileMenuButton';
import {NavigationList} from '../NavigationList/NavigationList';

import './DesktopNavigation.scss';

const b = block('desktop-navigation');

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
    logo,
    leftItemsWithIconSize,
    rightItemsWithIconSize,
    isSidebarOpened,
    onSidebarOpenedChange,
    onActiveItemChange,
    activeItemId,
    // additionalProps,
}) => (
    <div className={b('wrapper')}>
        {logo && (
            <div className={b('left')}>
                <Logo {...logo} className={b('logo')} />
            </div>
        )}
        <div className={b('navigation-container')}>
            <OverflowScroller className={b('navigation')} onScrollStart={onActiveItemChange}>
                <NavigationList
                    items={leftItemsWithIconSize}
                    onActiveItemChange={onActiveItemChange}
                    className={b('links')}
                    itemClassName={b('item')}
                    column={ItemColumnName.Left}
                    activeItemId={activeItemId}
                    menuLayout={NavigationLayout.Desktop}
                />
            </OverflowScroller>
        </div>
        <div className={b('right')}>
            <MobileMenuButton
                isSidebarOpened={isSidebarOpened}
                // additionalProps={additionalProps}
                onSidebarOpenedChange={onSidebarOpenedChange}
            />
            {rightItemsWithIconSize && (
                <NavigationList
                    onActiveItemChange={onActiveItemChange}
                    column={ItemColumnName.Right}
                    items={rightItemsWithIconSize}
                    activeItemId={activeItemId}
                    className={b('buttons')}
                    itemClassName={b('item')}
                    menuLayout={NavigationLayout.Desktop}
                />
            )}
        </div>
    </div>
);

export default DesktopNavigation;
