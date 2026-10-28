import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';
import CardLayout from '../CardLayout';

import {ChildrenCardOptions, ColSize, Default, WithBackground} from './helpers';

test.describe('CardLayout', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ChildrenCardOptions>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<ChildrenCardOptions />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ColSize>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ColSize />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBackground>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithBackground />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`card color compatibility ${colorScheme}`, () => {
        test.use({colorScheme});
        test('image surface ignores card colors', async ({mount, page}) => {
            await mount(
                <div
                    style={
                        {
                            '--pc-card-outlined-background-color': 'rgb(18, 52, 86)',
                            '--pc-card-border-color': 'rgb(69, 103, 137)',
                        } as React.CSSProperties
                    }
                >
                    <CardLayout background={{border: 'line'}} />
                </div>,
            );
            const image = page.locator('.pc-card-layout-block__image');
            await expect(image).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
            const border = await image.evaluate((el) =>
                getComputedStyle(el).getPropertyValue('--g-color-line-generic').trim(),
            );
            await expect(image).toHaveCSS('border-top-color', border);
        });
    });
}
