import React from 'react';

import {block} from '../../utils';
import {ScrollableProps as ScrollableParams} from '../../models/constructor-items/deprecated';

import './Scrollable.scss';

export interface ScrollableProps extends Omit<ScrollableParams, 'children'> {}

const b = block('scrollable-block');

function getItemOffset(index: number, offset?: number) {
    if (offset && index) {
        return {marginLeft: offset};
    }
    return {};
}

const Scrollable: React.FunctionComponent<ScrollableProps> = ({children, itemOffset}) => (
    <div className={b()}>
        {React.Children.map(children, (element, index) => (
            <span key={index} className={b('item')} style={getItemOffset(index, itemOffset)}>
                {element}
            </span>
        ))}
    </div>
);

export default Scrollable;
