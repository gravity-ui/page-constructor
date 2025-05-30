/* we won't use 'pc' class prefix here to let you opportunity to define yfm styles
in your project via global 'yfm' class */
import * as React from 'react';

import toSnakeCase from 'snakecase-keys';

import {HTML} from '../../components';
import {ClassNameProps, Modifiers} from '../../models';
import {QAProps} from '../../models/common';
import {cn} from '../../utils';
import {HTMLExtraProps} from '../HTML/HTML';

const yfm = cn('yfm');

export interface YFMWrapperProps
    extends React.PropsWithChildren,
        ClassNameProps,
        QAProps,
        HTMLExtraProps,
        React.HTMLProps<{}> {
    content: string;
    modifiers?: Modifiers;
    itemProp?: string;
    id?: string;
}

const YFMWrapper = ({contentClassName, modifiers, children, ...rest}: YFMWrapperProps) => (
    // @ts-ignore HTML component accepts children prop in actual usage
    <HTML
        contentClassName={yfm(modifiers ? toSnakeCase(modifiers) : {}, contentClassName)}
        {...rest}
    >
        {children}
    </HTML>
);

export default YFMWrapper;
