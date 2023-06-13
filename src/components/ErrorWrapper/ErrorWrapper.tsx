import React from 'react';

import {Button} from '@gravity-ui/uikit';

import {ClassNameProps, WithChildren} from '../../models';
import {block} from '../../utils';

import './ErrorWrapper.scss';

const b = block('ErrorWrapper');

export interface ErrorWrapperProps extends ClassNameProps {
    text: string;
    handler: () => void;
    isError: boolean;
    buttonText: string;
    children: React.ReactNode;
    qa?: string;
}

const ErrorWrapper = ({
    text,
    buttonText,
    className,
    handler,
    isError,
    children,
    qa,
}: WithChildren<ErrorWrapperProps>) =>
    isError ? (
        <div className={b(null, className)} data-qa={qa ? `${qa}-error` : undefined}>
            <div className={b('text')} data-qa={qa}>
                {text}
            </div>
            {handler && (
                <Button size="s" onClick={handler} qa={qa ? `${qa}-button` : undefined}>
                    {buttonText}
                </Button>
            )}
        </div>
    ) : (
        <React.Fragment>{children}</React.Fragment>
    );

export default ErrorWrapper;
