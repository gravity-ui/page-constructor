import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';

import {BorderLine, DarkTheme, Default, Quote, QuoteTypes} from './helpers';

test.describe('Quote', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <QuoteTypes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<QuoteTypes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BorderLine>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BorderLine />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <DarkTheme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DarkTheme />);
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
                            '--pc-card-outlined-background-color-hover': '#234567',
                        } as React.CSSProperties
                    }
                >
                    <Quote
                        text="Quote"
                        image="/story-assets/icon_1_light.svg"
                        logo="/story-assets/icon_1_light.svg"
                        border="line"
                        color="#abcdef"
                    />
                </div>,
            );
            const card = page.locator('.pc-quote');
            await expect(card).toHaveCSS('background-color', 'rgb(171, 205, 239)');
            await card.hover();
            await expect(card).toHaveCSS('background-color', 'rgb(171, 205, 239)');
            await expect(card).toHaveCSS('transform', 'none');
            await card.evaluate((el) => el.style.removeProperty('background-color'));
            await expect(card).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
        });
    });
}
