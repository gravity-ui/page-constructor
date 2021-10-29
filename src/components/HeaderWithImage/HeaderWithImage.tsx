import React from 'react';
import {block} from '../../utils';
import {HTML} from '@doc-tools/components';

import {HeaderWithImageProps as HeaderWithImageParams} from '../../models';
import {Grid, Row, Col} from '../../grid';
import BackgroundImage from '../BackgroundImage/BackgroundImage';

import './HeaderWithImage.scss';

export interface HeaderWithImageProps extends Omit<HeaderWithImageParams, 'children'> {
    className?: string;
}

const b = block('header-with-image-block');

const headerWithImageSizes = {
    md: 6,
    all: 12,
};

const HeaderWithImage: React.FunctionComponent<HeaderWithImageProps> = (props) => {
    const {title, subtitle, image, children, className} = props;

    return (
        <header className={b(null, className)}>
            <Grid containerClass={b('container')} className={b('content')}>
                <Row>
                    <Col className={b('titles')} sizes={headerWithImageSizes}>
                        <h1>
                            <HTML>{title}</HTML>
                        </h1>
                        {subtitle && (
                            <h5 className={b('subtitle')}>
                                <HTML>{subtitle}</HTML>
                            </h5>
                        )}
                        <div className={b('children')}>{children}</div>
                    </Col>
                    {image && (
                        <Col className={b('image-col')} sizes={headerWithImageSizes}>
                            <BackgroundImage className={b('image')} src={image} />
                        </Col>
                    )}
                </Row>
            </Grid>
        </header>
    );
};

export default HeaderWithImage;
