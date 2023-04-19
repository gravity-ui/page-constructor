import React from 'react';

/* we won't use 'pc' class prefix here to let you opportunity to define yfm styles
in your project via global 'yfm' class */
import block from 'bem-cn-lite';
import toSnakeCase from 'snakecase-keys';

import {HTML} from '../../components';
import {ClassNameProps, Modifiers} from '../../models';

const yfm = block('yfm');

export interface YFMWrapperProps {
    className?: string;
    content: string;
    modifiers?: Modifiers;
    itemProp?: string;
}

const YFMWrapper = ({
    content,
    modifiers,
    className,
    itemProp,
}: YFMWrapperProps & ClassNameProps) => (
    <HTML className={yfm(modifiers ? toSnakeCase(modifiers) : {}, className)} itemProp={itemProp}>
        {content}
    </HTML>
);

export default YFMWrapper;
