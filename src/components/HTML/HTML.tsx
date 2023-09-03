import React from 'react';

import {WithChildren} from '../../models';
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
}: WithChildren<HTMLProps & QAProps>) => {
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
