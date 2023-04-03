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
}

const ErrorWrapper = ({
    text,
    buttonText,
    className,
    handler,
    isError,
    children,
}: WithChildren<ErrorWrapperProps>) =>
    isError ? (
        <div className={b(null, className)}>
            <div className={b('text')}>{text}</div>
            {handler && (
                <Button size="s" onClick={handler}>
                    {buttonText}
                </Button>
            )}
        </div>
    ) : (
        <React.Fragment>{children}</React.Fragment>
    );

export default ErrorWrapper;
