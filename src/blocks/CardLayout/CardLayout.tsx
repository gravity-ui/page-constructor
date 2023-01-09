import React from 'react';

import {block} from '../../utils';
import {CardLayoutBlockProps as CardLayoutBlockParams} from '../../models';
import {Row, Col} from '../../grid';
import {HeaderComponent, AnimateBlock} from '../../components';

import './CardLayout.scss';

export interface CardLayoutBlockProps extends Omit<CardLayoutBlockParams, 'children'> {
    children?: React.ReactNode;
}

const b = block('card-layout-block');

const DEFAULT_SIZES = {
    all: 12,
    sm: 6,
    md: 4,
};

const CardLayout = ({
    title,
    description,
    animated,
    colSizes = DEFAULT_SIZES,
    children,
}: CardLayoutBlockProps) => (
    <AnimateBlock className={b()} animate={animated}>
        <HeaderComponent title={title} description={description} />
        <div>
            <Row>
                {children &&
                    React.Children.map(children, (child, i) => {
                        return (
                            <Col sizes={colSizes} key={i} className={b('item')}>
                                {child}
                            </Col>
                        );
                    })}
            </Row>
        </div>
    </AnimateBlock>
);

export default CardLayout;
