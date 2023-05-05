import React, {MouseEvent, useCallback, useMemo, useState} from 'react';

import _ from 'lodash';

import Control from '../../../components/Control/Control';
import OutsideClick from '../../../components/OutsideClick/OutsideClick';
import {Col, Grid, Row} from '../../../grid';
import {NavigationClose, NavigationOpen} from '../../../icons';
import {
    HeaderData,
    NavigationItemBase,
    NavigationItemModel,
    ThemedNavigationLogoData,
} from '../../../models';
import {block} from '../../../utils';
import {ItemColumnName} from '../../constants';
import Logo from '../Logo/Logo';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import Navigation from '../Navigation/Navigation';
import {NavigationListItem} from '../NavigationListItem/NavigationListItem';

import './Header.scss';

const b = block('header');

const ICON_SIZE = 36;

export interface HeaderProps {
    logo: ThemedNavigationLogoData;
    data: HeaderData;
}

interface MobileMenuButtonProps {
    isSidebarOpened: boolean;
    onSidebarOpenedChange: (arg: boolean) => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
    isSidebarOpened,
    onSidebarOpenedChange,
}) => {
    const iconProps = {
        icon: isSidebarOpened ? NavigationClose : NavigationOpen,
        iconSize: ICON_SIZE,
    };

    return (
        <Control
            className={b('mobile-menu-button')}
            onClick={(e: MouseEvent) => {
                e.stopPropagation();
                onSidebarOpenedChange(!isSidebarOpened);
            }}
            size="l"
            {...iconProps}
        />
    );
};

const iconSizeKey: keyof NavigationItemBase = 'iconSize';

export const Header: React.FC<HeaderProps> = ({data, logo}) => {
    const {leftItems, rightItems, iconSize} = data;
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);
    const [activeItemId, setactiveItemId] = useState<string | undefined>(undefined);

    const getNavigationItemWithIconSize = useCallback(
        (item: NavigationItemModel) => {
            if (!(iconSizeKey in item)) {
                return {...item, iconSize};
            }
            return item;
        },
        [iconSize],
    );

    const leftItemsWithIconSize = useMemo(
        () => leftItems && leftItems.map(getNavigationItemWithIconSize),
        [getNavigationItemWithIconSize, leftItems],
    );
    const rightItemsWithIconSize = useMemo(
        () => rightItems?.map(getNavigationItemWithIconSize),
        [getNavigationItemWithIconSize, rightItems],
    );

    const onActiveItemChange = useCallback((id?: string) => {
        setactiveItemId(id);
    }, []);

    const hidePopup = useCallback(() => {
        onActiveItemChange();
    }, [onActiveItemChange]);

    const onSidebarOpenedChange = useCallback((isOpen: boolean) => {
        setIsSidebarOpened(isOpen);
    }, []);

    const hideSidebar = useCallback(() => {
        setIsSidebarOpened(false);
    }, []);

    return (
        <Grid className={b()}>
            <Row>
                <Col>
                    <header className={b('wrapper')}>
                        {logo && (
                            <div className={b('left')}>
                                <Logo {...logo} className={b('logo')} />
                            </div>
                        )}
                        <div className={b('navigation-container')}>
                            <Navigation
                                className={b('navigation')}
                                links={leftItemsWithIconSize}
                                activeItemId={activeItemId}
                                onActiveItemChange={onActiveItemChange}
                            />
                        </div>
                        <div className={b('right')}>
                            <MobileMenuButton
                                isSidebarOpened={isSidebarOpened}
                                onSidebarOpenedChange={onSidebarOpenedChange}
                            />
                            {rightItemsWithIconSize && (
                                <ul className={b('buttons')}>
                                    {rightItemsWithIconSize.map((button, index) => (
                                        <NavigationListItem
                                            key={index}
                                            className={b('buttons-item')}
                                            item={button}
                                            index={index}
                                            activeItemId={activeItemId}
                                            hidePopup={hidePopup}
                                            column={ItemColumnName.Right}
                                            onActiveItemChange={onActiveItemChange}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                        <OutsideClick onOutsideClick={() => onSidebarOpenedChange(false)}>
                            <MobileNavigation
                                topItems={leftItems}
                                bottomItems={rightItems}
                                isOpened={isSidebarOpened}
                                activeItemId={activeItemId}
                                onActiveItemChange={onActiveItemChange}
                                onClose={hideSidebar}
                            />
                        </OutsideClick>
                    </header>
                </Col>
            </Row>
        </Grid>
    );
};

export default Header;
