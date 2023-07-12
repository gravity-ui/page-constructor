import React from 'react';

import {hasBlockTag} from 'src/utils';

import {WithChildren} from '../../models';

export interface HTMLProps {
    children?: string;
    block?: boolean;
    className?: string;
    itemProp?: string;
}

const HTML = ({children, block = false, className, itemProp}: WithChildren<HTMLProps>) => {
    if (!children) {
        return null;
    }

    return React.createElement(block || hasBlockTag(children) ? 'div' : 'span', {
        dangerouslySetInnerHTML: {__html: children},
        className,
        itemProp,
    });
};

export default HTML;
