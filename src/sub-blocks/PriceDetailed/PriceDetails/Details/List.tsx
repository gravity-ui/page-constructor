import React, {Fragment} from 'react';

import {block} from '../../../../utils';
import {PriceDetailsListProps, TextSize} from '../../../../models';
import {YFMWrapper} from '../../../../components';

import './List.scss';

const b = block('marked-list');

export interface ListProps {
    items: PriceDetailsListProps[];
    titleSize?: TextSize;
}

const List = (props: ListProps) => {
    const {items = [], titleSize = 's'} = props;

    return (
        <Fragment>
            {items.map((item, id) => (
                <div key={id} className={b('list-item')}>
                    <img className={b('img')} />
                    <div className={b('text', {size: titleSize})}>
                        <YFMWrapper content={item.text} modifiers={{constructor: true}} />
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

export default List;
