import React from 'react';

import toSnakeCase from 'snakecase-keys';

import {HTML} from '../../components';
import {ClassNameProps, Modifiers} from '../../models';
import {cn} from '../../utils';
import {QAProps} from '../../models/common';

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
