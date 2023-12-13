import React from 'react';

import {AnimateBlock, BackgroundImage, Title} from '../../components';
import {Col, GridColumnSizesType, Row} from '../../grid';
import {
    CardLayoutBlockProps as CardLayoutBlockParams,
    ClassNameProps,
    WithChildren,
} from '../../models';
import {block} from '../../utils';

import './CardLayout.scss';

const DEFAULT_SIZES: GridColumnSizesType = {
    all: 12,
    sm: 6,
    md: 4,
};
export type CardLayoutBlockProps = WithChildren<Omit<CardLayoutBlockParams, 'children'>> &
    ClassNameProps;

const b = block('card-layout-block');

const CardLayout: React.FC<CardLayoutBlockProps> = ({
    title,
    description,
    animated,
    colSizes = DEFAULT_SIZES,
    children,
    className,
    titleClassName,
    background,
}) => {
    const withBackground = Boolean(
        background && (background.src || background.desktop || background.style?.backgroundColor),
    );
    return (
        <AnimateBlock className={b(null, className)} animate={animated}>
            {(title || description) && (
                <Title title={title} subtitle={description} className={titleClassName} />
            )}
            <div
                className={b('content', {
                    'with-background': withBackground,
                })}
            >
                <BackgroundImage className={b('image')} {...background} />
                <Row>
                    {React.Children.map(children, (child, index) => (
                        <Col key={index} sizes={colSizes} className={b('item')}>
                            {child}
                        </Col>
                    ))}
                </Row>
            </div>
        </AnimateBlock>
    );
};

export default CardLayout;
