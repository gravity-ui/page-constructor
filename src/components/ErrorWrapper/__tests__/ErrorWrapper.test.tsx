import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import ErrorWrapper, {ErrorWrapperProps} from '../ErrorWrapper';

const qaId = 'error-wrapper-component';

const childrenTestId = `${qaId}-children`;

const errorWrapperProps = {
    text: 'Error text',
    isError: true,
    buttonText: 'Button text',
    handler: jest.fn(),
    children: <div data-qa={childrenTestId}>Children</div>,
    qa: qaId,
};

describe('ErrorWrapper', () => {
    test('render component by default', async () => {
        render(<ErrorWrapper {...errorWrapperProps} />);
        const errorWrapper = screen.queryByTestId(errorWrapperProps.qa);
        const children = screen.queryByTestId(childrenTestId);

        expect(errorWrapper).toBeInTheDocument();
        expect(errorWrapper).toBeVisible();
        expect(errorWrapper).not.toBeDisabled();

        expect(children).not.toBeInTheDocument();
    });

    test('set isError to false', async () => {
        render(<ErrorWrapper {...errorWrapperProps} isError={false} />);
        const errorWrapper = screen.queryByTestId(errorWrapperProps.qa);
        const children = screen.queryByTestId(childrenTestId);

        expect(errorWrapper).not.toBeInTheDocument();

        expect(children).toBeInTheDocument();
        expect(children).toBeVisible();
        expect(children).not.toBeDisabled();
    });

    test('text rendered', async () => {
        render(<ErrorWrapper {...errorWrapperProps} />);
        const errorWrapper = screen.queryByText(errorWrapperProps.text);

        expect(errorWrapper).toBeInTheDocument();
    });

    test('button rendered', async () => {
        render(<ErrorWrapper {...errorWrapperProps} />);
        const errorWrapper = screen.queryByText(errorWrapperProps.buttonText);

        expect(errorWrapper).toBeInTheDocument();
    });

    test('call handler', async () => {
        const user = userEvent.setup();
        render(<ErrorWrapper {...errorWrapperProps} />);

        const button = screen.getByTestId(`${errorWrapperProps.qa}-button`);

        await user.click(button);
        expect(errorWrapperProps.handler).toHaveBeenCalledTimes(1);
    });

    test('add className', () => {
        testCustomClassName<ErrorWrapperProps>({
            component: ErrorWrapper,
            props: errorWrapperProps,
            options: {customQaId: `${qaId}-error`},
        });
    });
});
