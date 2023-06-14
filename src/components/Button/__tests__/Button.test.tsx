import React from 'react';

import {ButtonSize} from '@gravity-ui/uikit';
import {render, screen} from '@testing-library/react';

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
        url: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/icon_1_light.svg',
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
});
