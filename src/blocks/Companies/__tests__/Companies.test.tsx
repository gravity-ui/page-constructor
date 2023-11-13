import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ThemeContext} from '../../../context/theme';
import {CompaniesBlockProps, Theme} from '../../../models';
import {getQaAttrubutes} from '../../../utils';
import Companies from '../Companies';

const companies: CompaniesBlockProps = {
    title: 'Companies Title',
    animated: true,
    images: {
        light: {
            desktop:
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logo-svg_12-12_desktop_light.svg',
            tablet: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logo-svg_12-12_tablet_light.svg',
            mobile: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logo-svg_12-12_mobile_light.svg',
            alt: 'Page constructor',
        },
        dark: {
            desktop:
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logo-svg_12-12_desktop_dark.svg',
            tablet: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logo-svg_12-12_tablet_dark.svg',
            mobile: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logo-svg_12-12_mobile_dark.svg',
            alt: 'Page constructor',
        },
    },
    qa: 'companies-block',
};

const qaAttributes = getQaAttrubutes(companies.qa, 'title');

describe('Companies', () => {
    test('render Companies by default', async () => {
        render(<Companies {...companies} />);

        const component = screen.getByTestId(qaAttributes.default);

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
    });

    test('render Companies with title', async () => {
        render(<Companies {...companies} />);

        const component = screen.getByTestId(qaAttributes.title);

        expect(component).toHaveTextContent(companies.title);
    });

    test('render Companies with animated', async () => {
        const user = userEvent.setup();

        render(
            <div style={{paddingTop: 100000}}>
                <Companies {...companies} />
            </div>,
        );

        const component = screen.getByTestId(qaAttributes.default);
        await user.hover(component);

        expect(component).toHaveClass('animate');
    });

    test('render Companies without animated', async () => {
        const user = userEvent.setup();

        render(
            <div style={{paddingTop: 100000}}>
                <Companies {...companies} animated={false} />
            </div>,
        );

        const component = screen.getByTestId(qaAttributes.default);
        await user.hover(component);

        expect(component).not.toHaveClass('animate');
    });

    test('render Companies pass className to AnimatedBlock', async () => {
        render(<Companies {...companies} />);

        const component = screen.getByTestId(qaAttributes.default);

        expect(component).toHaveClass('pc-companies-block');
    });

    test.each(new Array<Theme>(Theme.Light, Theme.Dark))(
        'render Companies with given %s theme',
        async (theme) => {
            render(
                <ThemeContext.Provider value={{theme}}>
                    <Companies {...companies} />
                </ThemeContext.Provider>,
            );

            const component = screen.getByRole('img');

            expect(component).toHaveAttribute(
                'src',
                `https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/logo-svg_12-12_desktop_${theme}.svg`,
            );
        },
    );
});
