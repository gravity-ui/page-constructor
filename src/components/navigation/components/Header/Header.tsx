import React, {MouseEvent, useCallback, useState} from 'react';
import block from 'bem-cn-lite';

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

export interface HeaderProps {
    logo: NavigationLogo;
    data: HeaderData;
}

export const Header: React.FC<HeaderProps> = ({data, logo}) => {
    const {leftItems, rightItems} = data;
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(-1);

    const onActiveItemChange = useCallback((index) => {
        setActiveItemIndex(index);
    }, []);

    const onSidebarOpenedChange = useCallback((isOpen: boolean) => {
        setIsSidebarOpened(isOpen);
    }, []);

    const hideSidebar = useCallback(() => {
        setIsSidebarOpened(false);
    }, []);

    const renderLogo = (
        <div className={b('left')}>
            <Logo {...logo} className={b('logo')} />
        </div>
    );

    const renderLeft = (
        <div className={b('navigation-container')}>
            <Navigation
                className={b('navigation')}
                links={leftItems}
                activeItemIndex={activeItemIndex}
                onActiveItemChange={onActiveItemChange}
            />
        </div>
    );

    const renderMobileMenuButton = () => {
        const iconProps = {icon: isSidebarOpened ? NavigationClose : NavigationOpen, iconSize: 36};

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

    const renderRightItems = (
        <div className={b('buttons')}>
            {rightItems &&
                rightItems.map((button) => (
                    <NavigationItem key={button.text} data={button} className={b('button')} />
                ))}
        </div>
    );

    const renderRight = (
        <div className={b('right')}>
            {renderMobileMenuButton()}
            {rightItems && renderRightItems}
        </div>
    );

    const renderMobileNavigation = (
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
    );

    return (
        <Grid className={b()}>
            <Row>
                <Col>
                    <header className={b('wrapper')}>
                        {logo && renderLogo}
                        {leftItems && renderLeft}
                        {renderRight}
                        {renderMobileNavigation}
                    </header>
                </Col>
            </Row>
        </Grid>
    );
};

export default Header;
