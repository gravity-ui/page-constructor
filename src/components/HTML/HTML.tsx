import React, {PropsWithChildren, useMemo} from 'react';

import {ClassNameProps, QAProps} from '../../models/common';
import {hasBlockTag} from '../../utils';

export interface HTMLExtraProps {
    variant?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'section' | 'p';
    contentPosition?: 'start' | 'end';
    contentClassName?: string;
    onlyContent?: boolean;
}
export interface HTMLProps extends HTMLExtraProps, PropsWithChildren, QAProps, ClassNameProps {
    content?: string;
    block?: boolean;
    itemProp?: string;
    id?: string;
}

const HTML = ({
    content,
    children,
    block = false,
    className,
    contentClassName,
    itemProp,
    id,
    qa,
    contentPosition = 'start',
    variant = 'span',
    onlyContent = false,
}: HTMLProps) => {
    const renderedContent = useMemo(() => {
        return content
            ? React.createElement(block || hasBlockTag(content) ? 'div' : 'span', {
                  dangerouslySetInnerHTML: {__html: content},
                  className: contentClassName,
                  itemProp,
                  id,
              })
            : null;
    }, [block, content, contentClassName, id, itemProp]);

    if (onlyContent) {
        return renderedContent;
    }

    return React.createElement(
        variant,
        {
            className,
            'data-qa': qa,
        },
        contentPosition === 'start' ? renderedContent : null,
        children,
        contentPosition === 'end' ? renderedContent : null,
    );
};

export default HTML;
