import React, {useEffect, useMemo, useState} from 'react';

import debounce from 'lodash/debounce';

import OutsideClick from '../../../components/OutsideClick/OutsideClick';
import {Col, Grid, Row} from '../../../grid';
import {HeaderData, ThemedNavigationLogoData} from '../../../models';
import {block} from '../../../utils';
import {getNavigationItemWithIconSize} from '../../utils';
import DesktopNavigation from '../DesktopNavigation/DesktopNavigation';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

import './Navigation.scss';

const b = block('navigation');

export interface NavigationProps {
    logo: ThemedNavigationLogoData;
    data: HeaderData;
}

export const Navigation: React.FC<NavigationProps> = ({data, logo}) => {
    const {leftItems, rightItems, iconSize = 20, withBorder = false} = data;
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
        const showBorderOnScroll = () => {
            if (!showBorder) {
                setShowBorder(window.scrollY > 0);
            }
        };

        const scrollHandler = debounce(showBorderOnScroll, 20);

        window.addEventListener('scroll', scrollHandler, {passive: true});
        return () => window.removeEventListener('scroll', scrollHandler);
    });

    return (
        <Grid className={b({'with-border': showBorder})}>
            <Row>
                <Col>
                    <nav>
                        <DesktopNavigation
                            logo={logo}
                            activeItemId={activeItemId}
                            onActiveItemChange={onActiveItemChange}
                            leftItemsWithIconSize={leftItemsWithIconSize}
                            rightItemsWithIconSize={rightItemsWithIconSize}
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
