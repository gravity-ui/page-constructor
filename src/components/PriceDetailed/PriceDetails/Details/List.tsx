import React, {Fragment} from 'react';
import {block} from '../../../../utils';
import {PriceDetailsListProps, TextSize} from '../../../../models';

import checkLogoListMark from '../../../../../assets/images/check-logo-list-mark.svg';

import './List.scss';

const b = block('marked-list');

export interface ListProps {
    items: PriceDetailsListProps[];
    titleSize?: TextSize;
}

const List: React.FunctionComponent<ListProps> = (props) => {
    const {items = [], titleSize = 's'} = props;

    return (
        <Fragment>
            {items.map((item, id) => (
                <div key={id} className={b('list-item')}>
                    <img className={b('img')} src={checkLogoListMark} />
                    <div className={b('text', {size: titleSize})}>{item.text}</div>
                </div>
            ))}
        </Fragment>
    );
};

export default List;
