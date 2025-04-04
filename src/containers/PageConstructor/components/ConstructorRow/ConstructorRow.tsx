import * as React from 'react';

import {block} from '../../../../utils';

import './ConstructorRow.scss';

const b = block('constructor-row');

export const ConstructorRow = ({children}: React.PropsWithChildren<{}>) =>
    children ? <div className={b()}>{children}</div> : null;
