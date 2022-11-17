import React, {createRef, MouseEvent} from 'react';
import block from 'bem-cn-lite';
import {Col, Grid, Row} from '../../../../grid';
import OutsideClick from '../../../OutsideClick/OutsideClick';
import Control from '../../../Control/Control';

import Logo from '../Logo/Logo';

import {HeaderData, NavigationLogo} from '../../../../models/navigation';
import Navigation from '../Navigation/Navigation';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import NavigationItem from '../NavigationItem/NavigationItem';

import {NavigationClose, NavigationOpen} from '../../../../icons';

import './Header.scss';

const b = block('header');

export interface HeaderProps {
    logo: NavigationLogo;
    data: HeaderData;
}

interface HeaderState {
    isSidebarOpened: boolean;
    activeItemIndex: number;
}

class Header extends React.Component<HeaderProps, HeaderState> {
    ref = createRef();
    state = {
        isSidebarOpened: false,
        activeItemIndex: -1,
    };

    render() {
        return (
            <Grid className={b()}>
                <Row>
                    <Col>
                        <header className={b('wrapper')}>
                            {this.renderLogo()}
                            {this.renderLeft()}
                            {this.renderRight()}
                            {this.renderMobileNavigation()}
                        </header>
                    </Col>
                </Row>
            </Grid>
        );
    }

    private renderLeft() {
        const {activeItemIndex} = this.state;
        const {leftItems} = this.props.data;

        return (
            leftItems && (
                <div className={b('navigation-container')}>
                    <Navigation
                        className={b('navigation')}
                        links={leftItems}
                        activeItemIndex={activeItemIndex}
                        onActiveItemChange={this.onActiveItemChange}
                    />
                </div>
            )
        );
    }

    private renderLogo() {
        const {logo} = this.props;

        if (!logo) {
            return null;
        }

        return (
            <div className={b('left')}>
                <Logo {...logo} className={b('logo')} />
            </div>
        );
    }

    private renderRight() {
        return (
            <div className={b('right')}>
                {this.renderMobileMenuButton()}
                {this.renderRightItems()}
            </div>
        );
    }

    private renderRightItems() {
        const {rightItems} = this.props.data;

        return (
            rightItems && (
                <div className={b('buttons')}>
                    {rightItems.map((button) => (
                        <NavigationItem key={button.text} data={button} className={b('button')} />
                    ))}
                </div>
            )
        );
    }

    private renderMobileMenuButton() {
        const {isSidebarOpened} = this.state;
        const iconProps = {icon: isSidebarOpened ? NavigationClose : NavigationOpen, iconSize: 36};

        return (
            <Control
                className={b('mobile-menu-button')}
                onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    this.onSidebarOpenedChange(!isSidebarOpened);
                }}
                size="l"
                {...iconProps}
            />
        );
    }

    private renderMobileNavigation() {
        const {leftItems, rightItems} = this.props.data;
        const {isSidebarOpened, activeItemIndex} = this.state;

        return (
            <OutsideClick onOutsideClick={() => this.onSidebarOpenedChange(false)}>
                <MobileNavigation
                    topItems={leftItems}
                    bottomItems={rightItems}
                    isOpened={isSidebarOpened}
                    activeItemIndex={activeItemIndex}
                    onActiveItemChange={this.onActiveItemChange}
                    onClose={this.hideSidebar}
                />
            </OutsideClick>
        );
    }

    private onActiveItemChange = (index: number) => {
        this.setState({activeItemIndex: index});
    };

    private onSidebarOpenedChange = (isSidebarOpened: boolean) => {
        this.setState({isSidebarOpened});
    };

    private hideSidebar = () => {
        this.setState({isSidebarOpened: false});
    };
}

export default Header;
