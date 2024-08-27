/* we won't use 'pc' class prefix here to let you opportunity to define yfm styles
in your project via global 'yfm' class */
import React, {PropsWithChildren} from 'react';

import toSnakeCase from 'snakecase-keys';

import {HTML} from '../../components';
import {ClassNameProps, Modifiers} from '../../models';
import {QAProps} from '../../models/common';
import {cn} from '../../utils';
import {HTMLExtraProps} from '../HTML/HTML';

const yfm = cn('yfm');

export interface YFMWrapperProps
    extends PropsWithChildren,
        ClassNameProps,
        QAProps,
        HTMLExtraProps {
    content: string;
    modifiers?: Modifiers;
    itemProp?: string;
    id?: string;
}

const YFMWrapper = ({
    content,
    modifiers,
    contentClassName,
    className,
    itemProp,
    id,
    qa,
    children,
    variant,
    contentPosition,
}: YFMWrapperProps) => (
    <HTML
        contentClassName={yfm(modifiers ? toSnakeCase(modifiers) : {}, contentClassName)}
        itemProp={itemProp}
        id={id}
        qa={qa}
        content={content}
        className={className}
        variant={variant}
        contentPosition={contentPosition}
    >
        {children}
    </HTML>
);

export default YFMWrapper;
