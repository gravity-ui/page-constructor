import React, {MouseEvent, useCallback, useEffect, useMemo, useState} from 'react';

import _ from 'lodash';

import Control from '../../../components/Control/Control';
import OutsideClick from '../../../components/OutsideClick/OutsideClick';
import {Col, Grid, Row} from '../../../grid';
import {NavigationClose, NavigationOpen} from '../../../icons';
import {
    HeaderData,
    NavigationButtonItem,
    NavigationDropdownItem,
    NavigationItemBase,
    NavigationItemModel,
    NavigationItemType,
    NavigationLinkItem,
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

const isButtonItem = (item: NavigationItemModel): item is NavigationButtonItem =>
    item.type === NavigationItemType.Button;

const isDropdownItem = (item: NavigationItemModel): item is NavigationDropdownItem =>
    item.type === NavigationItemType.Dropdown;

export const Header: React.FC<HeaderProps> = ({data, logo}) => {
    const {leftItems, rightItems, iconSize = 20, withBorder = false} = data;
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);
    const [activeItemId, setactiveItemId] = useState<string | undefined>(undefined);
    const [withHeaderBorder, setWithHeaderBorder] = useState(withBorder);

    const getNavigationItemWithIconSize = useCallback(
        (item: NavigationItemModel) => {
            const newItem = {...item};
            if ('items' in newItem && isDropdownItem(newItem)) {
                newItem.items = newItem.items.map(
                    getNavigationItemWithIconSize,
                ) as NavigationLinkItem[];
            }

            if (!(iconSizeKey in newItem) && !isButtonItem(newItem)) {
                newItem.iconSize = iconSize;
            }
            return newItem;
        },
        [iconSize],
    );

    const leftItemsWithIconSize = useMemo(
        () => leftItems.map(getNavigationItemWithIconSize),
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

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0 && !withBorder) {
                setWithHeaderBorder(true);
            } else if (window.scrollY === 0 && !withBorder) {
                setWithHeaderBorder(false);
            }
        };

        window.addEventListener('scroll', _.debounce(handleScroll, 5), {passive: true});
        return () => window.removeEventListener('scroll', _.debounce(handleScroll, 5));
    });

    return (
        <Grid className={b({'with-border': withHeaderBorder})}>
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
