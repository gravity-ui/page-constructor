import React, {useMemo} from 'react';

import {block} from '../../utils';
import {CardLayoutBlockProps as CardLayoutBlockParams} from '../../models';
import {Row} from '../../grid';
import {BlockHeader, AnimateBlock} from '../../components';
import CardLayoutContext, {DEFAULT_SIZES} from './CardLayoutContext';

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

export default CardLayout;
