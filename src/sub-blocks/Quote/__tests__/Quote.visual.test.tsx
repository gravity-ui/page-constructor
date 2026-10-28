import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';
import Quote from '../Quote';

import {BorderLine, DarkTheme, Default, QuoteTypes} from './helpers';

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
                            '--pc-card-outlined-background-color': 'rgb(18, 52, 86)',
                            '--pc-card-outlined-background-color-hover': 'rgb(35, 69, 103)',
                        } as React.CSSProperties
                    }
                >
                    <Quote
                        text="Quote"
                        image="/story-assets/icon_1_light.svg"
                        logo="/story-assets/icon_1_light.svg"
                        border="line"
                        color="rgb(171, 205, 239)"
                    />
                </div>,
            );
            const card = page.locator('.pc-quote');
            await expect(card).toHaveCSS('background-color', 'rgb(171, 205, 239)');
            await card.hover();
            await expect(card).toHaveCSS('background-color', 'rgb(171, 205, 239)');
            await expect(card).toHaveCSS('transform', 'none');
            await card.evaluate((el) => el.style.removeProperty('background-color'));
            await expect(card).toHaveCSS('background-color', 'rgb(18, 52, 86)');
        });
    });
}
