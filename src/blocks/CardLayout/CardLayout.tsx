import React from 'react';

import {block} from '../../utils';
import {CardLayoutBlockProps as CardLayoutBlockParams, WithChildren} from '../../models';
import {Col, GridColumnSizesType, Row} from '../../grid';
import {BlockHeader, AnimateBlock} from '../../components';

import './CardLayout.scss';

const DEFAULT_SIZES: GridColumnSizesType = {
    all: 12,
    sm: 6,
    md: 4,
};
export type CardLayoutBlockProps = WithChildren<Omit<CardLayoutBlockParams, 'children'>>;

const b = block('card-layout-block');

const CardLayout: React.FC<CardLayoutBlockProps> = ({
    title,
    description,
    animated,
    colSizes = DEFAULT_SIZES,
    children,
}) => (
    <AnimateBlock className={b()} animate={animated}>
        <BlockHeader title={title} description={description} />
        <Row>
            {React.Children.map(children, (child, index) => (
                <Col key={index} sizes={colSizes} className={b('item')}>
                    {child}
                </Col>
            ))}
        </Row>
    </AnimateBlock>
);

export default CardLayout;
