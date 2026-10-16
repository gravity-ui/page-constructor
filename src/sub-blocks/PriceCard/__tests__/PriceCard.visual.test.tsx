import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';

import {Default, DifferentContent, Link, PriceCard, Themed} from './helpers';

test.describe('PriceCard', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Link>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Link />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <DifferentContent>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DifferentContent />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Themed>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Themed />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`card color compatibility ${colorScheme}`, () => {
        test.use({colorScheme});
        test('individual background and hover', async ({mount, page}) => {
            await mount(
                <div
                    style={
                        {
                            '--pc-card-outlined-background-color': 'transparent',
                            '--pc-card-background-color-hover': '#234567',
                        } as React.CSSProperties
                    }
                >
                    <PriceCard title="Price" price="10" border="line" backgroundColor="#abcdef" />
                </div>,
            );
            const card = page.locator('.pc-price-card');
            await expect(card).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
            await expect(page.locator('.pc-price-card__background')).toHaveCSS(
                'background-color',
                'rgb(171, 205, 239)',
            );
            await card.hover();
            await expect(card).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
            await expect(card).toHaveCSS('transform', 'none');
        });
    });
}
