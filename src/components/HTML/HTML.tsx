import React from 'react';

import {ReactFCC} from '../../models';

export interface HTMLProps {
    children?: string;
    block?: boolean;
    className?: string;
}

const HTML: ReactFCC<HTMLProps> = ({children, block = false, className}) => {
    if (!children) {
        return null;
    }

    return React.createElement(block ? 'div' : 'span', {
        dangerouslySetInnerHTML: {__html: children},
        className,
    });
};

export default HTML;
