import React, {MouseEvent, useCallback} from 'react';

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
    const {mobileHeaderItems = [], CustomMobileMenuButton = null} = customMobileHeaderData;

    const mobileButtonDefaultClickAction = useCallback(
        (event: MouseEvent) => {
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();

            onSidebarOpenedChange(!isSidebarOpened);
        },
        [isSidebarOpened, onSidebarOpenedChange],
    );

    const mobileMenuButton = CustomMobileMenuButton ? (
        <div
            className={b('custom-mobile-menu-button-wrapper')}
            onClick={mobileButtonDefaultClickAction}
        >
            <CustomMobileMenuButton
                className={b('custom-mobile-menu-button')}
                isSidebarOpened={isSidebarOpened}
                customHookData={customHookData}
            />
        </div>
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
                {mobileHeaderItems && (
                    <div className={b('custom-mobile-navigation-container')}>
                        <OverflowScroller
                            className={b('custom-mobile-navigation')}
                            onScrollStart={onActiveItemChange}
                            arrowSize={18}
                        >
                            <NavigationList
                                items={mobileHeaderItems}
                                onActiveItemChange={onActiveItemChange}
                                className={b('mobile-buttons')}
                                itemClassName={b('item')}
                                column={ItemColumnName.Left}
                                activeItemId={activeItemId}
                                menuLayout={NavigationLayout.MobileHeader}
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
