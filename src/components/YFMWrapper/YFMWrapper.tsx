/* we won't use 'pc' class prefix here to let you opportunity to define yfm styles
in your project via global 'yfm' class */
import React from 'react';

import block from 'bem-cn-lite';
import toSnakeCase from 'snakecase-keys';

import {HTML} from '../../components';
import {ClassNameProps, Modifiers} from '../../models';

const yfm = block('yfm');

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
