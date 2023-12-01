import React from 'react';

import {cn} from '../../../utils';
import {NavigationItemProps} from '../../models';

import './CustomComponent.scss';

const b = cn('dropdown-navigation-item');

type DCDropdownNavigationItemProps = Pick<
    NavigationItemProps,
    'onClick' | 'isActive' | 'menuLayout'
>;

export const CustomComponent: React.FC<DCDropdownNavigationItemProps> = (props) => {
    const {onClick, isActive, menuLayout} = props;
    return (
        <div className={b({active: isActive})} onClick={onClick}>
            <span className={b('text')}>Custom Item</span>
            {' ('}
            {`${menuLayout}`}
            {isActive && ' - active'}
            {')'}
        </div>
    );
};
