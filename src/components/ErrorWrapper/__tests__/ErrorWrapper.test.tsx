import React from 'react';

import {render, screen} from '@testing-library/react';

import {testCustomClassName, testOnClick} from '../../../../test-utils/shared/common';
import {getQaAttrubutes} from '../../../utils';
import ErrorWrapper, {ErrorWrapperProps} from '../ErrorWrapper';

const errorWrapperProps = {
    text: 'Error Wrapper Text',
    buttonText: 'Button Text',
    isError: true,
    children: <div>Children</div>,
    qa: 'error-wrapper-component',
};

const qaAttributes = getQaAttrubutes(errorWrapperProps.qa);

const ErrorWrapperComponent = ({children, ...props}: ErrorWrapperProps) => {
    return <ErrorWrapper {...props}>{children}</ErrorWrapper>;
};

describe('ErrorWrapper', () => {
    test('render ErrorWrapper by default', async () => {
        render(<ErrorWrapperComponent {...errorWrapperProps} />);
        const errorWrapper = screen.getByTestId(qaAttributes.default);
        const children = screen.queryByText('Children');

        expect(errorWrapper).toBeInTheDocument();
        expect(errorWrapper).toBeVisible();
        expect(errorWrapper).not.toBeDisabled();

        expect(children).not.toBeInTheDocument();
    });

    test('render ErrorWrapper with isError = false', async () => {
        render(<ErrorWrapperComponent {...errorWrapperProps} isError={false} />);
        const errorWrapper = screen.queryByTestId(qaAttributes.default);
        const children = screen.queryByText('Children');

        expect(children).toBeInTheDocument();
        expect(children).toBeVisible();

        expect(errorWrapper).not.toBeInTheDocument();
    });

    test('render ErrorWrapper with error text', async () => {
        render(<ErrorWrapperComponent {...errorWrapperProps} />);
        const errorWrapper = screen.queryByText(errorWrapperProps.text);

        expect(errorWrapper).toBeInTheDocument();
        expect(errorWrapper).toBeVisible();
    });

    test('render ErrorWrapper with error text', async () => {
        render(<ErrorWrapperComponent {...errorWrapperProps} />);
        const errorWrapper = screen.queryByText(errorWrapperProps.text);

        expect(errorWrapper).toBeInTheDocument();
        expect(errorWrapper).toBeVisible();
    });

    test('render ErrorWrapper with error text', async () => {
        render(<ErrorWrapperComponent {...errorWrapperProps} />);
        const errorWrapper = screen.queryByText(errorWrapperProps.text);

        expect(errorWrapper).toBeInTheDocument();
        expect(errorWrapper).toBeVisible();
    });

    test('render ErrorWrapper with button', async () => {
        const handleOnClick = jest.fn();
        render(<ErrorWrapperComponent {...errorWrapperProps} handler={handleOnClick} />);
        const errorWrapperButton = screen.queryByTestId(qaAttributes.button);

        expect(errorWrapperButton).toBeInTheDocument();
        expect(errorWrapperButton).toBeVisible();
        expect(errorWrapperButton).toHaveTextContent(errorWrapperProps.buttonText);
    });

    test('render ErrorWrapper without button when handler is not provided', async () => {
        render(<ErrorWrapperComponent {...errorWrapperProps} />);
        const errorWrapperButton = screen.queryByTestId(qaAttributes.button);

        expect(errorWrapperButton).not.toBeInTheDocument();
    });

    test('call onClick', async () => {
        testOnClick<ErrorWrapperProps>({
            component: ErrorWrapperComponent,
            props: {...errorWrapperProps},
            options: {
                handlerName: 'handler',
                qaId: qaAttributes.button,
            },
        });
    });

    test('add className', () => {
        testCustomClassName<ErrorWrapperProps>({
            component: ErrorWrapperComponent,
            props: errorWrapperProps,
        });
    });
});
