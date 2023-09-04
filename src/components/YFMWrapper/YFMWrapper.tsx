import React from 'react';

import toSnakeCase from 'snakecase-keys';

import {HTML} from '../../components';
import {ClassNameProps, Modifiers} from '../../models';
import {cn} from '../../utils';

const yfm = cn('yfm');

export interface YFMWrapperProps extends ClassNameProps {
    content: string;
    modifiers?: Modifiers;
    itemProp?: string;
    id?: string;
}

const YFMWrapper = ({content, modifiers, className, itemProp, id}: YFMWrapperProps) => (
    <HTML
        className={yfm(modifiers ? toSnakeCase(modifiers) : {}, className)}
        itemProp={itemProp}
        id={id}
    >
        {content}
    </HTML>
);

export default YFMWrapper;
