import React from 'react';

import {block} from '../../utils';
import {DividerProps, ReactFCC} from '../../models';

import './Divider.scss';

const b = block('divider-block');

const Divider: ReactFCC<DividerProps> = ({size = 'm', border}) => (
    <div className={b({size, border})} />
);

export default Divider;
