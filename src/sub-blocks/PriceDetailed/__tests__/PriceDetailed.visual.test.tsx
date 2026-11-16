import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';
import PriceDetailed from '../PriceDetailed';

import {MarkedList, Settings, WithBlackText} from './helpers';

test.describe('PriceDetailed', () => {
    test('render stories <MarkedList>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<MarkedList />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Settings>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Settings />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBlackText>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithBlackText />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`card color compatibility ${colorScheme}`, () => {
        test.use({colorScheme});
        test('shared surface inherits card colors', async ({mount, page}) => {
            await mount(
                <div
                    style={
                        {
                            '--pc-card-outlined-background-color': 'rgb(18, 52, 86)',
                            '--pc-card-border-color': 'rgb(69, 103, 137)',
                        } as React.CSSProperties
                    }
                >
                    <PriceDetailed
                        border="line"
                        items={[{title: 'Separate', description: 'Plan'}]}
                    />
                    <PriceDetailed
                        border="line"
                        items={[{title: 'Combined', description: 'Plan'}]}
                        isCombined
                    />
                </div>,
            );
            const cards = page.locator('.pc-card-base-block');
            await expect(cards).toHaveCount(2);
            for (const card of await cards.all()) {
                await expect(card).toHaveCSS('background-color', 'rgb(18, 52, 86)');
                await expect(card).toHaveCSS('border-top-color', 'rgb(69, 103, 137)');
            }
        });
    });
}
