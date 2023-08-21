import React from 'react';

import {WithChildren} from '../../models';
import {hasBlockTag} from '../../utils';

export interface HTMLProps {
    children?: string;
    block?: boolean;
    className?: string;
    itemProp?: string;
    id?: string;
}

const HTML = ({children, block = false, className, itemProp, id}: WithChildren<HTMLProps>) => {
    if (!children) {
        return null;
    }

    return React.createElement(block || hasBlockTag(children) ? 'div' : 'span', {
        dangerouslySetInnerHTML: {__html: children},
        className,
        itemProp,
        id,
    });
};

export default HTML;
