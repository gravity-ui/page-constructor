import {ButtonSize} from '@gravity-ui/uikit';
import {fireEvent, render, screen} from '@testing-library/react';

import {testCustomClassName, testOnClick} from '../../../../test-utils/shared/common';
import {ButtonImagePosition, ButtonTheme} from '../../../models';
import Button, {ButtonProps} from '../Button';
import {ICON_QA} from '../utils';

const qa = 'button-component';

const buttonProps = {
    text: 'Button Text',
    url: 'https://github.com/gravity-ui/',
    target: '_blank',
    img: {
        url: '/mock.svg',
        position: 'left' as ButtonImagePosition,
        alt: 'alt-text',
    },
};

const buttonViews: ButtonTheme[] = [
    'normal',
    'action',
    'outlined',
    'outlined-info',
    'outlined-danger',
    'raised',
    'flat',
    'flat-info',
    'flat-danger',
    'flat-secondary',
    'contrast',
    'contrast-inverted',
    'contrast-light',
    'contrast-dark',
    'normal-contrast',
    'outlined-contrast',
    'flat-contrast',
    'github',
    'scale',
    'monochrome',
];

describe('Button', () => {
    test('render button by default', async () => {
        render(<Button text={buttonProps.text} />);
        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
        expect(button).toBeVisible();
        expect(button).not.toBeDisabled();
    });

    test('should render <a /> tag', async () => {
        render(
            <Button text={buttonProps.text} url={buttonProps.url} target={buttonProps.target} />,
        );
        const button = screen.getByRole('link');

        expect(button).toBeVisible();
        expect(button).toHaveAttribute('href', buttonProps.url);
        expect(button).toHaveAttribute('target', buttonProps.target);
    });

    test('call onClick', async () => {
        testOnClick<ButtonProps>({
            component: Button,
            props: {text: buttonProps.text, qa},
        });
    });

    test.each(new Array<ButtonSize>('s', 'm', 'l', 'xl'))('render with given "%s" size', (size) => {
        render(<Button text={buttonProps.text} size={size} qa={qa} />);
        const button = screen.getByTestId(qa);

        expect(button).toHaveClass(`pc-button-block_size_${size}`);
    });

    test.each(new Array<ButtonTheme>(...buttonViews))('render with given "%s" view', (theme) => {
        render(<Button text={buttonProps.text} theme={theme} qa={qa} />);
        const button = screen.getByTestId(qa);

        expect(button).toHaveClass(`pc-button-block_theme_${theme}`);
    });

    test('should preserve the native click handler and title from extraProps', () => {
        const rootClick = jest.fn();
        const nativeClick = jest.fn();
        render(
            <Button
                text="Native"
                onClick={rootClick}
                urlTitle="Root"
                extraProps={{onClick: nativeClick, title: 'Native'}}
            />,
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(nativeClick).toHaveBeenCalledTimes(1);
        expect(rootClick).not.toHaveBeenCalled();
        expect(button).toHaveAttribute('title', 'Native');
    });

    test('add className', () => {
        testCustomClassName<ButtonProps>({
            component: Button,
            props: {text: buttonProps.text, qa},
        });
    });

    test('should render icon', () => {
        render(<Button text={buttonProps.text} img={buttonProps.img} />);

        const button = screen.getByRole('button');
        const iconComponent = screen.getByRole('img');

        expect(iconComponent).toBeVisible();
        expect(button).toContainElement(iconComponent);
    });

    test('should render github icon', () => {
        render(<Button text={buttonProps.text} img={buttonProps.img} theme="github" />);

        const button = screen.getByRole('button');
        const iconComponent = screen.getByTestId(ICON_QA);

        expect(iconComponent).toBeVisible();
        expect(button).toContainElement(iconComponent);
    });

    test.each([
        ['normal-contrast', 'contrast-light'],
        ['outlined-contrast', 'outlined'],
        ['flat-contrast', 'flat'],
    ] as const)('should preserve the legacy %s theme with UIkit view %s', (theme, view) => {
        render(<Button text="Legacy theme" theme={theme} qa={qa} />);
        expect(screen.getByTestId(qa)).toHaveClass(`g-button_view_${view}`);
        expect(screen.getByTestId(qa)).toHaveClass(`pc-button-block_theme_${theme}`);
    });

    test('should forward native attributes from extraProps', () => {
        render(
            <Button
                text="Tab"
                extraProps={{role: 'tab', 'aria-selected': true, 'aria-controls': 'panel'}}
            />,
        );
        const tab = screen.getByRole('tab');
        expect(tab).toHaveAttribute('aria-selected', 'true');
        expect(tab).toHaveAttribute('aria-controls', 'panel');
    });
});
