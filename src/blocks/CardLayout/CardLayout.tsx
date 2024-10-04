import React from 'react';

import isEmpty from 'lodash/isEmpty';

import {AnimateBlock, BackgroundImage, Title} from '../../components';
import ChildrenWrap from '../../components/editor/ChildrenWrap/ChildrenWrap';
import ItemWrap from '../../components/editor/ItemWrap/ItemWrap';
import {Col, Grid, GridColumnSizesType, Row} from '../../grid';
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
    const {border, ...backgroundImageProps} = background || {};
    return (
        <AnimateBlock className={b(null, className)} animate={animated}>
            <Grid>
                {(title || description) && (
                    <Title title={title} subtitle={description} className={titleClassName} />
                )}
                <div
                    className={b('content', {
                        'with-background': !isEmpty(background),
                    })}
                >
                    <BackgroundImage className={b('image', {border})} {...backgroundImageProps} />

                    <ChildrenWrap>
                        <Row>
                            {React.Children.map(children, (child, index) => (
                                <Col key={index} sizes={colSizes} className={b('item')}>
                                    <ItemWrap index={index}>{child}</ItemWrap>
                                </Col>
                            ))}
                        </Row>
                    </ChildrenWrap>
                </div>
            </Grid>
        </AnimateBlock>
    );
};

export default CardLayout;
