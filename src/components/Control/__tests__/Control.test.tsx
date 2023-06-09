import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import Control, {ControlProps} from '../Control';

const qaId = 'control-component';

const icon = `<path d="M1 2H0v12h16v-2H1V2zm11.5 5.5L9 4 5.5 7.5 2 4v7h14V4l-3.5 3.5z"></path>`;
const themes: ControlProps['theme'][] = ['primary', 'secondary', 'link', 'accent'];
const sizes: ControlProps['size'][] = ['xs', 's', 'm', 'l'];

describe('Control', () => {
    test('render Control by default', async () => {
        render(<Control icon={icon} qa={qaId} />);
        const control = screen.getByTestId(qaId);

        expect(control).toBeInTheDocument();
        expect(control).toBeVisible();
        expect(control).not.toBeDisabled();

        /** We are not use direct node access to test nested nodes.
         * But in this case we need to check svg attributes.
         * As SvgIcon component is from another package we can't arange it for now.
         * So we disable eslint rule for this case.
         */
        /* eslint-disable testing-library/no-node-access */
        expect(control.firstChild).toHaveAttribute(`width`, '16');
        expect(control.firstChild).toHaveAttribute(`height`, '16');
        /* eslint-enable testing-library/no-node-access */
    });

    test('add disabled', async () => {
        render(<Control icon={icon} qa={qaId} disabled />);
        const control = screen.getByTestId(qaId);

        expect(control).toBeInTheDocument();
        expect(control).toBeVisible();
        expect(control).toBeDisabled();
    });

    test('add className', () => {
        testCustomClassName<ControlProps>({
            component: Control,
            props: {icon, qa: qaId},
        });
    });

    test.each(new Array<ControlProps['theme']>(...themes))(
        'render with given "%s" theme',
        (theme) => {
            render(<Control icon={icon} qa={qaId} theme={theme} />);
            const control = screen.getByTestId(qaId);

            expect(control).toHaveClass(`pc-control_theme_${theme}`);
        },
    );

    test.each(new Array<ControlProps['size']>(...sizes))('render with given "%s" size', (size) => {
        render(<Control icon={icon} qa={qaId} size={size} />);
        const control = screen.getByTestId(qaId);

        expect(control).toHaveClass(`pc-control_size_${size}`);
    });

    test('add iconSize', () => {
        const iconSize = 24;
        render(<Control icon={icon} qa={qaId} iconSize={iconSize} />);
        const control = screen.getByTestId(qaId);

        /* eslint-disable testing-library/no-node-access */
        expect(control.firstChild).toHaveAttribute(`width`, `${iconSize}`);
        expect(control.firstChild).toHaveAttribute(`height`, `${iconSize}`);
        /* eslint-enable testing-library/no-node-access */
    });

    test('add onClick', async () => {
        const handleOnClick = jest.fn();
        const user = userEvent.setup();
        render(<Control icon={icon} qa={qaId} onClick={handleOnClick} />);

        const control = screen.getByTestId(qaId);

        await user.click(control);
        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });
});
