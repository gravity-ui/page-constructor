import * as React from 'react';

import OverflowScroller from '../../../components/OverflowScroller/OverflowScroller';
import {block, isLogoSet} from '../../../utils';
import {DesktopNavigationProps, ItemColumnName, NavigationLayout} from '../../models';
import Logo from '../Logo/Logo';
import {MobileMenuButton} from '../MobileMenuButton/MobileMenuButton';
import {NavigationList} from '../NavigationList/NavigationList';

import './DesktopNavigation.scss';

const b = block('desktop-navigation');

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
    logo,
    leftItemsWithIconSize,
    rightItemsWithIconSize,
    customMobileHeaderItems,
    isSidebarOpened,
    onSidebarOpenedChange,
    onActiveItemChange,
    activeItemId,
}) => (
    <div className={b('wrapper')}>
        {isLogoSet(logo) && (
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
            {customMobileHeaderItems && (
                <div className={b('mobile-navigation-container')}>
                    <OverflowScroller
                        className={b('mobile-navigation')}
                        onScrollStart={onActiveItemChange}
                        arrowSize={18}
                    >
                        <NavigationList
                            items={customMobileHeaderItems}
                            onActiveItemChange={onActiveItemChange}
                            className={b('mobile-buttons')}
                            itemClassName={b('item')}
                            column={ItemColumnName.Left}
                            activeItemId={activeItemId}
                            menuLayout={NavigationLayout.Dropdown}
                        />
                    </OverflowScroller>
                </div>
            )}
            <MobileMenuButton
                isSidebarOpened={isSidebarOpened}
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
