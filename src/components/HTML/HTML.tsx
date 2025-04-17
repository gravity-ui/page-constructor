import * as React from 'react';

import {ClassNameProps, QAProps, TagName} from '../../models/common';
import {selectTagName} from '../../utils';

export interface HTMLExtraProps {
    tagName?: TagName;
    contentPosition?: 'start' | 'end';
    contentClassName?: string;
    onlyContent?: boolean;
}
export interface HTMLProps
    extends HTMLExtraProps,
        React.PropsWithChildren,
        QAProps,
        ClassNameProps {
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
    tagName = 'span',
    onlyContent = false,
    ...rest
}: HTMLProps) => {
    const renderedContent = React.useMemo(() => {
        return content
            ? React.createElement(selectTagName({content, block, tagName, children}), {
                  dangerouslySetInnerHTML: {__html: content},
                  className: contentClassName,
                  'data-qa': qa,
                  ...rest,
              })
            : null;
    }, [block, children, content, contentClassName, qa, rest, tagName]);

    if (onlyContent) {
        return renderedContent;
    }

    if (children) {
        return React.createElement(
            tagName,
            {
                className,
            },
            contentPosition === 'start' ? renderedContent : null,
            children,
            contentPosition === 'end' ? renderedContent : null,
        );
    }

    return renderedContent;
};

export default HTML;
