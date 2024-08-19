import React, {useEffect, useMemo, useState} from 'react';

import debounce from 'lodash/debounce';

import OutsideClick from '../../../components/OutsideClick/OutsideClick';
import {Col, Grid, Row} from '../../../grid';
import {
    ClassNameProps,
    HeaderData,
    NavigationItemModel,
    ThemedNavigationLogoData,
} from '../../../models';
import {block} from '../../../utils';
import {getNavigationItemWithIconSize} from '../../utils';
import DesktopNavigation from '../DesktopNavigation/DesktopNavigation';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

import './Navigation.scss';

const b = block('navigation');

export interface NavigationComponentProps extends ClassNameProps {
    logo: ThemedNavigationLogoData;
    data: HeaderData;
}

export const useActiveNavItem = (
    iconSize: number,
    leftItems: NavigationItemModel[],
    rightItems?: NavigationItemModel[],
) => {
    const [activeItemId, setActiveItemId] = useState<string | undefined>(undefined);

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
    return {activeItemId, leftItemsWithIconSize, rightItemsWithIconSize, onActiveItemChange};
};

export const useShowBorder = (withBorder: boolean, withBorderOnScroll: boolean) => {
    const [showBorder, setShowBorder] = useState(withBorder);

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

    return [showBorder];
};

export const Navigation: React.FC<NavigationComponentProps> = ({data, logo, className}) => {
    const {
        leftItems,
        rightItems,
        customMobileHeaderItems,
        iconSize = 20,
        withBorder = false,
        withBorderOnScroll = true,
    } = data;

    const [isSidebarOpened, setIsSidebarOpened] = useState(false);
    const [showBorder] = useShowBorder(withBorder, withBorderOnScroll);
    const {activeItemId, leftItemsWithIconSize, rightItemsWithIconSize, onActiveItemChange} =
        useActiveNavItem(iconSize, leftItems, rightItems);

    const onSidebarOpenedChange = (isOpen: boolean) => setIsSidebarOpened(isOpen);

    return (
        <Grid className={b({'with-border': showBorder}, className)}>
            <Row>
                <Col>
                    <nav>
                        <DesktopNavigation
                            logo={logo}
                            activeItemId={activeItemId}
                            onActiveItemChange={onActiveItemChange}
                            leftItemsWithIconSize={leftItemsWithIconSize}
                            rightItemsWithIconSize={rightItemsWithIconSize}
                            customMobileHeaderItems={customMobileHeaderItems}
                            isSidebarOpened={isSidebarOpened}
                            onSidebarOpenedChange={onSidebarOpenedChange}
                        />
                        <OutsideClick onOutsideClick={() => onSidebarOpenedChange(false)}>
                            <MobileNavigation
                                topItems={leftItemsWithIconSize}
                                bottomItems={rightItemsWithIconSize}
                                isOpened={isSidebarOpened}
                                activeItemId={activeItemId}
                                onActiveItemChange={onActiveItemChange}
                            />
                        </OutsideClick>
                    </nav>
                </Col>
            </Row>
        </Grid>
    );
};

export default Navigation;
