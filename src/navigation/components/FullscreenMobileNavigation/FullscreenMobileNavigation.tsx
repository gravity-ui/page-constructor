import React, {memo} from 'react';

import {Portal} from '@gravity-ui/uikit';

import {useMount} from '../../../hooks';
import {block} from '../../../utils';
import {CustomMobileMenuProps, ItemColumnName, NavigationLayout} from '../../models';
import {NavigationList} from '../NavigationList/NavigationList';

import './FullscreenMobileNavigation.scss';

const b = block('fullscreen-mobile-navigation');

const FullscreenMobileNavigation: React.FC<CustomMobileMenuProps> = memo(
    ({isOpened, topItems, bottomItems, customHookData, customMobileMenuData, ...props}) => {
        const {
            appearanceSide = 'right',
            Header = null,
            Content = null,
            Footer = null,
        } = customMobileMenuData;

        const [isMounted, setIsMounted] = React.useState(false);

        useMount(() => setIsMounted(true));

        if (!isMounted) {
            return null;
        }

        const header = Header ? <Header customHookData={customHookData} /> : null;
        const footer = Footer ? <Footer customHookData={customHookData} /> : null;
        const content = Content ? (
            <Content customHookData={customHookData} />
        ) : (
            <div className={b('nav-lists')}>
                {topItems && (
                    <NavigationList
                        className={b('rows')}
                        items={topItems}
                        column={ItemColumnName.Top}
                        menuLayout={NavigationLayout.MobileFullscreen}
                        {...props}
                    />
                )}
                {bottomItems && (
                    <NavigationList
                        className={b('rows')}
                        items={bottomItems}
                        column={ItemColumnName.Bottom}
                        menuLayout={NavigationLayout.MobileFullscreen}
                        {...props}
                    />
                )}
            </div>
        );

        return (
            <Portal>
                <div className={b({opened: isOpened, [appearanceSide]: true})}>
                    <div className={b('header')}>{header}</div>
                    <div className={b('content', {'has-custom-content': Content})}>{content}</div>
                    <div className={b('footer')}>{footer}</div>
                </div>
            </Portal>
        );
    },
);

FullscreenMobileNavigation.displayName = 'FullscreenMobileNavigation';

export default FullscreenMobileNavigation;
