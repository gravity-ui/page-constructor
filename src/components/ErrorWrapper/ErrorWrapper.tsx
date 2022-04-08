import React from 'react';
import {Button} from '@yandex-cloud/uikit';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

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

const ErrorWrapper: React.FC<ErrorWrapperProps> = ({
    text,
    buttonText,
    className,
    handler,
    isError,
    children,
}) =>
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
