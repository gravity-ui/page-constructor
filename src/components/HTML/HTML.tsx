import React, {PropsWithChildren, useMemo} from 'react';

import {ClassNameProps, QAProps} from '../../models/common';
import {selectVariant} from '../../utils';

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
    qa,
    contentPosition = 'start',
    variant = 'span',
    onlyContent = false,
    ...rest
}: HTMLProps) => {
    const renderedContent = useMemo(() => {
        return content
            ? React.createElement(selectVariant({content, block, variant, children}), {
                  dangerouslySetInnerHTML: {__html: content},
                  className: contentClassName,
                  ...rest,
              })
            : null;
    }, [block, children, content, contentClassName, rest, variant]);

    if (onlyContent) {
        return renderedContent;
    }

    if (children) {
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
    }

    return renderedContent;
};

export default HTML;
