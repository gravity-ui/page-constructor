import React from 'react';

import {QAProps} from '../../models/common';
import {hasBlockTag} from '../../utils';

export interface HTMLProps {
    children?: string;
    block?: boolean;
    className?: string;
    itemProp?: string;
    id?: string;
}

const HTML = ({
    children,
    block = false,
    className,
    itemProp,
    id,
    qa,
}: React.PropsWithChildren<HTMLProps & QAProps>) => {
    if (!children) {
        return null;
    }

    return React.createElement(block || hasBlockTag(children) ? 'div' : 'span', {
        dangerouslySetInnerHTML: {__html: children},
        className,
        itemProp,
        id,
        'data-qa': qa,
    });
};

export default HTML;
