import React, {MouseEvent, useCallback, useState} from 'react';

import {block} from '../../../../utils';
import {HeaderData, NavigationLogo} from '../../../../models';
import {Col, Grid, Row} from '../../../../grid';
import OutsideClick from '../../../OutsideClick/OutsideClick';
import Control from '../../../Control/Control';
import Navigation from '../Navigation/Navigation';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import NavigationItem from '../NavigationItem/NavigationItem';
import Logo from '../Logo/Logo';

import {NavigationClose, NavigationOpen} from '../../../../icons';

import './Header.scss';

const b = block('header');

const ICON_SIZE = 36;

export interface HeaderProps {
    logo: NavigationLogo;
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

export const Header: React.FC<HeaderProps> = ({data, logo}) => {
    const {leftItems, rightItems} = data;
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(-1);

    const onActiveItemChange = useCallback((index: number) => {
        setActiveItemIndex(index);
    }, []);

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
                                links={leftItems}
                                activeItemIndex={activeItemIndex}
                                onActiveItemChange={onActiveItemChange}
                            />
                        </div>
                        <div className={b('right')}>
                            <MobileMenuButton
                                isSidebarOpened={isSidebarOpened}
                                onSidebarOpenedChange={onSidebarOpenedChange}
                            />
                            {rightItems && (
                                <div className={b('buttons')}>
                                    {rightItems.map((button) => (
                                        <NavigationItem
                                            key={button.text}
                                            data={button}
                                            className={b('button')}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <OutsideClick onOutsideClick={() => onSidebarOpenedChange(false)}>
                            <MobileNavigation
                                topItems={leftItems}
                                bottomItems={rightItems}
                                isOpened={isSidebarOpened}
                                activeItemIndex={activeItemIndex}
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
