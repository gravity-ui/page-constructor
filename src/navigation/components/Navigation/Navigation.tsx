import React, {useEffect, useMemo, useState} from 'react';

import debounce from 'lodash/debounce';

import OutsideClick from '../../../components/OutsideClick/OutsideClick';
import {Col, Grid, Row} from '../../../grid';
import {ClassNameProps, HeaderData, ThemedNavigationLogoData} from '../../../models';
import {block} from '../../../utils';
import {getNavigationItemWithIconSize} from '../../utils';
import DesktopNavigation from '../DesktopNavigation/DesktopNavigation';
import FullscreenMobileNavigation from '../FullscreenMobileNavigation/FullscreenMobileNavigation';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

import './Navigation.scss';

const b = block('navigation');

export interface NavigationProps extends ClassNameProps {
    logo: ThemedNavigationLogoData;
    data: HeaderData;
}

export const Navigation: React.FC<NavigationProps> = ({data, logo, className}) => {
    const {
        leftItems,
        rightItems,
        iconSize = 20,
        withBorder = false,
        withBorderOnScroll = true,
        useCustomHook = () => {},
        customMobileMenuData,
        customMobileHeaderData = {},
    } = data;

    const customHookData = useCustomHook() || {};

    const [isSidebarOpened, setIsSidebarOpened] = useState(false);
    const [activeItemId, setActiveItemId] = useState<string | undefined>(undefined);
    const [showBorder, setShowBorder] = useState(withBorder);

    const getNavigationItem = getNavigationItemWithIconSize(iconSize);

    const leftItemsWithIconSize = useMemo(
        () => leftItems.map(getNavigationItem),
        [getNavigationItem, leftItems],
    );
    const rightItemsWithIconSize = useMemo(
        () => rightItems?.map(getNavigationItem),
        [getNavigationItem, rightItems],
    );

    const onActiveItemChange = (id?: string) => {
        setActiveItemId(id);
    };

    const onSidebarOpenedChange = (isOpen: boolean) => setIsSidebarOpened(isOpen);

    useEffect(() => {
        if (!withBorderOnScroll) return () => {};

        const showBorderOnScroll = () => {
            if (!withBorder) {
                setShowBorder(window.scrollY > 0);
            }
        };

        const scrollHandler = debounce(showBorderOnScroll, 20);

        window.addEventListener('scroll', scrollHandler, {passive: true});
        return () => window.removeEventListener('scroll', scrollHandler);
    });

    const desktopNavigation = (
        <DesktopNavigation
            logo={logo}
            activeItemId={activeItemId}
            onActiveItemChange={onActiveItemChange}
            leftItemsWithIconSize={leftItemsWithIconSize}
            rightItemsWithIconSize={rightItemsWithIconSize}
            isSidebarOpened={isSidebarOpened}
            onSidebarOpenedChange={onSidebarOpenedChange}
            customHookData={customHookData}
            customMobileHeaderData={customMobileHeaderData}
        />
    );

    const mobileNavigation = customMobileMenuData ? (
        <FullscreenMobileNavigation
            isOpened={isSidebarOpened}
            topItems={leftItemsWithIconSize}
            bottomItems={rightItemsWithIconSize}
            customHookData={customHookData}
            customMobileMenuData={customMobileMenuData}
            activeItemId={activeItemId}
            onActiveItemChange={onActiveItemChange}
        />
    ) : (
        <OutsideClick onOutsideClick={() => onSidebarOpenedChange(false)}>
            <MobileNavigation
                topItems={leftItemsWithIconSize}
                bottomItems={rightItemsWithIconSize}
                isOpened={isSidebarOpened}
                activeItemId={activeItemId}
                onActiveItemChange={onActiveItemChange}
            />
        </OutsideClick>
    );

    return (
        <Grid className={b({'with-border': showBorder}, className)}>
            <Row>
                <Col>
                    <nav>
                        {desktopNavigation}
                        {mobileNavigation}
                    </nav>
                </Col>
            </Row>
        </Grid>
    );
};

export default Navigation;
