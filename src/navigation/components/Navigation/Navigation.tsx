import * as React from 'react';

import OutsideClick from '../../../components/OutsideClick/OutsideClick';
import {Col, Grid, Row} from '../../../grid';
import {ClassNameProps, HeaderData, ThemedNavigationLogoData} from '../../../models';
import {block} from '../../../utils';
import {useActiveNavItem, useShowBorder} from '../../hooks';
import DesktopNavigation from '../DesktopNavigation/DesktopNavigation';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

import './Navigation.scss';

const b = block('navigation');

export interface NavigationComponentProps extends ClassNameProps {
    logo?: ThemedNavigationLogoData;
    data?: HeaderData;
    mobilePortalContainer?: React.RefObject<HTMLElement>;
}

export const Navigation: React.FC<NavigationComponentProps> = ({
    data,
    logo,
    className,
    mobilePortalContainer,
}) => {
    const {
        leftItems = [],
        rightItems,
        customMobileHeaderItems,
        iconSize = 20,
        withBorder = false,
        withBorderOnScroll = true,
    } = data || {};

    const [isSidebarOpened, setIsSidebarOpened] = React.useState(false);
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
                                portalContainer={mobilePortalContainer}
                            />
                        </OutsideClick>
                    </nav>
                </Col>
            </Row>
        </Grid>
    );
};

export default Navigation;
