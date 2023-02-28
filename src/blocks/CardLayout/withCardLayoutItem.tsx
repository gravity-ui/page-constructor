import React, {Fragment} from 'react';
import {useCardLayoutContext} from './CardLayoutContext';
import {block} from '../../utils';
import {Col} from '../../grid';
import {ItemWrapper} from '../../context/innerContext';
import {WithChildren} from '../../models';

const b = block('card-layout-block');

const CardLayoutItem: React.FC<WithChildren> = ({children}) => {
    const context = useCardLayoutContext();

    return context ? (
        <Col sizes={context.colSizes} className={b('item')}>
            {children}
        </Col>
    ) : (
        <Fragment>{children}</Fragment>
    );
};

export const withCardLayoutItem: ItemWrapper = (item, key, {type}, {subBlockTypes}) => {
    return subBlockTypes.includes(type) ? <CardLayoutItem key={key}>{item}</CardLayoutItem> : item;
};

export default withCardLayoutItem;
