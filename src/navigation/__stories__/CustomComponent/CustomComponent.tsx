import React from 'react';

import {cn} from '../../../utils';
import {NavigationItemProps} from '../../models';

import './CustomComponent.scss';

const b = cn('custom-nav-item');

type DCDropdownNavigationItemProps = Pick<
    NavigationItemProps,
    'onClick' | 'isActive' | 'menuLayout'
>;

export const CustomComponent: React.FC<DCDropdownNavigationItemProps> = (props) => {
    const {onClick, isActive, menuLayout} = props;
    return (
        <div className={b({active: isActive})} onClick={onClick}>
            {`Custom Item (${menuLayout}${isActive ? ' - active' : ''})`}
        </div>
    );
};
