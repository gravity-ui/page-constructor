import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';

import {
    BackgroundCard,
    BackgroundColor,
    BorderLine,
    CardThemes,
    ControlPosition,
    Default,
    Paddings,
    WithBackgroundImage,
    WithUrl,
} from './helpers';

test.describe('BackgroundCard', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBackgroundImage>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<WithBackgroundImage />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Paddings>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Paddings />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <CardThemes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<CardThemes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BorderLine>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BorderLine />);
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

    test('render stories <ControlPosition>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ControlPosition />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`card color compatibility ${colorScheme}`, () => {
        test.use({colorScheme});
        for (const variant of ['light', 'dark', 'color', 'image', 'image-color'] as const) {
            test(`individual background and hover: ${variant}`, async ({mount, page}) => {
                const cardTheme = variant === 'light' || variant === 'dark' ? variant : 'default';
                const hasColor = variant === 'color' || variant === 'image-color';
                const hasImage = variant === 'image' || variant === 'image-color';
                const imageSrc = `/story-assets/img-bg_nopadding_4-12_${colorScheme}.png`;
                await mount(
                    <div
                        style={
                            {
                                width: 360,
                                padding: 16,
                                '--pc-card-background-color': '#123456',
                                '--pc-card-background-color-hover': '#234567',
                                '--pc-card-outlined-background-color': '#345678',
                                '--pc-card-outlined-background-color-hover': '#456789',
                            } as React.CSSProperties
                        }
                    >
                        <BackgroundCard
                            title="Individual background"
                            text="The card keeps its theme, color and image on hover."
                            theme={cardTheme}
                            border="line"
                            url="#card"
                            backgroundColor={hasColor ? '#abcdef' : undefined}
                            background={
                                hasImage ? {src: imageSrc, disableCompress: true} : undefined
                            }
                        />
                    </div>,
                );
                const card = page.locator('.pc-background-card');
                const layer = page.locator('.pc-background-card__image');
                const image = layer.locator('img');
                const themedColor = await card.evaluate((el, theme) => {
                    // Normalize the theme token (HEX) to the browser's computed RGB format.
                    const probe = document.createElement('span');
                    probe.style.backgroundColor =
                        theme === 'light'
                            ? 'var(--pc-color-base-silver)'
                            : 'var(--pc-color-base-asphalt)';
                    el.append(probe);
                    const color = getComputedStyle(probe).backgroundColor;
                    probe.remove();
                    return color;
                }, cardTheme);
                const expectedBorder = hasColor || cardTheme !== 'default' ? 'none' : 'line';
                await expect(card).toHaveClass(
                    new RegExp(`pc-card-base-block_border_${expectedBorder}`),
                );
                if (hasImage) {
                    await expect(image).toBeVisible();
                    await expect
                        .poll(() =>
                            image.evaluate(
                                (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
                            ),
                        )
                        .toBe(true);
                    await expect(image).toHaveAttribute('src', imageSrc);
                }
                const checkBackground = async (hover: boolean) => {
                    let expectedColor = themedColor;
                    if (cardTheme === 'default') {
                        const backgroundColors =
                            expectedBorder === 'line'
                                ? ['rgb(52, 86, 120)', 'rgb(69, 103, 137)']
                                : ['rgb(18, 52, 86)', 'rgb(35, 69, 103)'];
                        expectedColor = backgroundColors[hover ? 1 : 0];
                    }
                    await expect(card).toHaveCSS('background-color', expectedColor);
                    if (hasColor) {
                        await expect(layer).toHaveCSS('background-color', 'rgb(171, 205, 239)');
                    }
                    if (hasImage) {
                        await expect(image).toBeVisible();
                        await expect(image).toHaveAttribute('src', imageSrc);
                    }
                };
                await checkBackground(false);
                await expect(page.locator('.playwright-wrapper-test')).toHaveScreenshot(
                    `card-background-${colorScheme}-${variant}-normal.png`,
                );
                await card.hover();
                await checkBackground(true);
                await expect(page.locator('.playwright-wrapper-test')).toHaveScreenshot(
                    `card-background-${colorScheme}-${variant}-hover.png`,
                );
            });
        }
    });
}
