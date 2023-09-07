/* we won't use 'pc' class prefix here to let you opportunity to define yfm styles
in your project via global 'yfm' class */
import React from 'react';

import toSnakeCase from 'snakecase-keys';

import {HTML} from '../../components';
import {ClassNameProps, Modifiers} from '../../models';
import {QAProps} from '../../models/common';
import {cn} from '../../utils';

const yfm = cn('yfm');

export interface YFMWrapperProps extends ClassNameProps, QAProps {
    content: string;
    modifiers?: Modifiers;
    itemProp?: string;
    id?: string;
}

const YFMWrapper = ({content, modifiers, className, itemProp, id, qa}: YFMWrapperProps) => (
    <HTML
        className={yfm(modifiers ? toSnakeCase(modifiers) : {}, className)}
        itemProp={itemProp}
        id={id}
        qa={qa}
    >
        {content}
    </HTML>
);

export default YFMWrapper;
