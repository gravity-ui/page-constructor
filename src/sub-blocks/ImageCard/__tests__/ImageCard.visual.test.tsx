import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';

import {
    BackgroundColor,
    Border,
    BorderRadius,
    Content,
    ControlPosition,
    Default,
    DirectionReverse,
    ImageCard,
    Margins,
    Size,
    WithUrl,
} from './helpers';

test.describe('ImageCard', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Margins>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Margins />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <DirectionReverse>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DirectionReverse />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Content>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Content />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BackgroundColor>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BackgroundColor />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithUrl>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithUrl />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Border>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Border />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BorderRadius>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BorderRadius />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ControlPosition>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ControlPosition />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Size>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Size />);
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
                            '--pc-card-background-color': '#123456',
                            '--pc-card-background-color-hover': '#234567',
                        } as React.CSSProperties
                    }
                >
                    <ImageCard
                        title="Image"
                        image="/story-assets/icon_1_light.svg"
                        url="#card"
                        backgroundColor="#abcdef"
                    />
                </div>,
            );
            const card = page.locator('.pc-image-card');
            await expect(card).toHaveCSS('background-color', 'rgb(171, 205, 239)');
            await card.hover();
            await expect(card).toHaveCSS('background-color', 'rgb(171, 205, 239)');
            await card.evaluate((el) => el.style.removeProperty('background-color'));
            await expect(card).toHaveCSS('background-color', 'rgb(35, 69, 103)');
        });
    });
}
