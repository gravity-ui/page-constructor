import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';
import PriceCard from '../PriceCard';

import {Default, DifferentContent, Link, Themed} from './helpers';

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
                            '--pc-card-outlined-background-color': 'rgb(18, 52, 86)',
                            '--pc-card-background-color-hover': 'rgb(35, 69, 103)',
                        } as React.CSSProperties
                    }
                >
                    <PriceCard
                        title="Price"
                        price="10"
                        border="line"
                        backgroundColor="rgb(171, 205, 239)"
                    />
                </div>,
            );
            const card = page.locator('.pc-price-card');
            await expect(card).toHaveCSS('background-color', 'rgb(18, 52, 86)');
            await expect(page.locator('.pc-price-card__background')).toHaveCSS(
                'background-color',
                'rgb(171, 205, 239)',
            );
            await card.hover();
            await expect(card).toHaveCSS('background-color', 'rgb(18, 52, 86)');
            await expect(card).toHaveCSS('transform', 'none');
        });
    });
}
