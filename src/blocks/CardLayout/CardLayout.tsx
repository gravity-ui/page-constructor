import React, {Fragment, useMemo} from 'react';

import {block} from '../../utils';
import {CardLayoutBlockProps as CardLayoutBlockParams, WithChildren} from '../../models';
import {Col, Row} from '../../grid';
import {BlockHeader, AnimateBlock} from '../../components';
import CardLayoutContext, {DEFAULT_SIZES, useCardLayoutContext} from './CardLayoutContext';

import './CardLayout.scss';

export interface CardLayoutBlockProps extends Omit<CardLayoutBlockParams, 'children'> {
    children?: React.ReactNode;
}

const b = block('card-layout-block');

const CardLayout = ({
    title,
    description,
    animated,
    colSizes = DEFAULT_SIZES,
    children,
}: CardLayoutBlockProps) => {
    const data = useMemo(() => ({colSizes}), [colSizes]);

    return (
        <AnimateBlock className={b()} animate={animated}>
            <BlockHeader title={title} description={description} />
            <CardLayoutContext.Provider value={data}>
                <Row>{children}</Row>
            </CardLayoutContext.Provider>
        </AnimateBlock>
    );
};

export const CardLayoutItem: React.FC<WithChildren> = ({children}) => {
    const context = useCardLayoutContext();

    return context ? (
        <Col sizes={context.colSizes} className={b('item')}>
            {children}
        </Col>
    ) : (
        <Fragment>{children}</Fragment>
    );
};

export default CardLayout;
