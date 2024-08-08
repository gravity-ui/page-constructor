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
    customHookData,
    customMobileHeaderData,
    onActiveItemChange,
    activeItemId,
}) => {
    const {headerMobileItems = [], CustomMobileMenuButton = null} = customMobileHeaderData;

    const mobileMenuButton = CustomMobileMenuButton ? (
        <CustomMobileMenuButton
            className={b('custom-mobile-menu-button')}
            isSidebarOpened={isSidebarOpened}
            onSidebarOpenedChange={onSidebarOpenedChange}
            customHookData={customHookData}
        />
    ) : (
        <MobileMenuButton
            isSidebarOpened={isSidebarOpened}
            onSidebarOpenedChange={onSidebarOpenedChange}
        />
    );

    return (
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
                {headerMobileItems && (
                    <div className={b('custom-mobile-navigation-container')}>
                        <OverflowScroller
                            className={b('custom-mobile-navigation')}
                            onScrollStart={onActiveItemChange}
                            arrowSize={18}
                        >
                            <NavigationList
                                items={headerMobileItems}
                                onActiveItemChange={onActiveItemChange}
                                className={b('mobile-buttons')}
                                itemClassName={b('item')}
                                column={ItemColumnName.Left}
                                activeItemId={activeItemId}
                                menuLayout={NavigationLayout.MobileHorizontal}
                            />
                        </OverflowScroller>
                    </div>
                )}

                {mobileMenuButton}

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
};

export default DesktopNavigation;
