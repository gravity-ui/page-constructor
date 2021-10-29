import React from 'react';
import {block} from '../../utils';
import {HTML} from '@doc-tools/components';

import {HeaderProps as HeaderParams, HeaderWidth} from '../../models';
import {Grid, Row, Col} from '../../grid';
import BackgroundImage from '../BackgroundImage/BackgroundImage';

import './Header.scss';

export interface HeaderProps extends Omit<HeaderParams, 'children'> {}

const b = block('header-block');

function getTitleSizes(width: HeaderWidth) {
    switch (width) {
        case 's':
            return {
                lg: 6,
                sm: 7,
                all: 12,
            };
        case 'm':
            return {
                lg: 8,
                md: 8,
                sm: 10,
                all: 12,
            };
        default:
            return {all: 12};
    }
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const {
        background: {image: backgroundImage, color: backgroundColor} = {},
        title,
        subtitle,
        theme,
        image,
        width = 'l',
        children,
    } = props;

    return (
        <BackgroundImage src={backgroundImage}>
            <header className={b({theme})} style={{backgroundColor}}>
                <BackgroundImage src={image}>
                    <Grid className={b('content')}>
                        <Row>
                            <Col className={b('titles', {theme})} sizes={getTitleSizes(width)}>
                                <h1>
                                    <HTML>{title}</HTML>
                                </h1>
                                {subtitle && (
                                    <h4 className={b('subtitle')}>
                                        <HTML>{subtitle}</HTML>
                                    </h4>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col>{children}</Col>
                        </Row>
                    </Grid>
                </BackgroundImage>
            </header>
        </BackgroundImage>
    );
};

export default Header;
