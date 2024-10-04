import React from 'react';

import {WithChildren} from '../../../../models';
import {block} from '../../../../utils';

import './ConstructorRow.scss';

const b = block('constructor-row');

export const ConstructorRow = ({children}: WithChildren<{}>) =>
    children ? <div className={b()}>{children}</div> : null;
