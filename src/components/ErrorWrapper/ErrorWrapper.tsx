import React from 'react';

import {Button} from '@gravity-ui/uikit';

import {ClassNameProps, QAProps, WithChildren} from '../../models';
import {block, getQaAttrubutes} from '../../utils';

import './ErrorWrapper.scss';

const b = block('ErrorWrapper');

export interface ErrorWrapperProps extends ClassNameProps, QAProps {
    text: string;
    isError: boolean;
    buttonText: string;
    children: React.ReactNode;
    handler?: () => void;
}

const ErrorWrapper = ({
    text,
    buttonText,
    className,
    isError,
    children,
    qa,
    handler,
}: WithChildren<ErrorWrapperProps>) => {
    const qaAttributes = getQaAttrubutes(qa);

    return isError ? (
        <div className={b(null, className)} data-qa={qaAttributes.default}>
            <div className={b('text')}>{text}</div>
            {handler && (
                <Button size="s" onClick={handler} qa={qaAttributes.button}>
                    {buttonText}
                </Button>
            )}
        </div>
    ) : (
        <React.Fragment>{children}</React.Fragment>
    );
};

export default ErrorWrapper;
