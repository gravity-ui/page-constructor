import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';
import BackgroundCard from '../BackgroundCard';

import {
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
        test('individual backgrounds and real hover', async ({mount, page}) => {
            await mount(
                <div
                    style={
                        {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, minmax(240px, 1fr))',
                            gap: 24,
                            maxWidth: 1200,
                            minWidth: 800,
                            padding: 32,
                            '--pc-card-background-color': 'rgb(18, 52, 86)',
                            '--pc-card-background-color-hover': 'rgb(35, 69, 103)',
                            '--pc-card-outlined-background-color': 'rgb(52, 86, 120)',
                            '--pc-card-outlined-background-color-hover': 'rgb(69, 103, 137)',
                        } as React.CSSProperties
                    }
                >
                    {(['light', 'dark', 'color', 'image', 'image-color'] as const).map(
                        (variant) => {
                            const hasColor = variant === 'color' || variant === 'image-color';
                            const hasImage = variant === 'image' || variant === 'image-color';
                            return (
                                <div key={variant} data-qa={`background-${variant}`}>
                                    <BackgroundCard
                                        title={
                                            {
                                                light: 'Light card theme',
                                                dark: 'Dark card theme',
                                                color: 'Background color',
                                                image: 'Background image',
                                                'image-color': 'Image and color',
                                            }[variant]
                                        }
                                        theme={
                                            variant === 'light' || variant === 'dark'
                                                ? variant
                                                : 'default'
                                        }
                                        border="line"
                                        url="#colors"
                                        backgroundColor={
                                            hasColor ? 'rgb(171, 205, 239)' : undefined
                                        }
                                        background={
                                            hasImage
                                                ? {
                                                      light: {
                                                          src: '/story-assets/img-bg_nopadding_4-12_light.png',
                                                          disableCompress: true,
                                                      },
                                                      dark: {
                                                          src: '/story-assets/img-bg_nopadding_4-12_dark.png',
                                                          disableCompress: true,
                                                      },
                                                  }
                                                : undefined
                                        }
                                    />
                                </div>
                            );
                        },
                    )}
                </div>,
            );
            const wrapper = page.locator('.playwright-wrapper-test');
            for (const image of await wrapper.locator('.pc-background-card__image img').all()) {
                await expect
                    .poll(() =>
                        image.evaluate(
                            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
                        ),
                    )
                    .toBe(true);
            }
            await expect(wrapper).toHaveScreenshot(
                `card-background-grid-${colorScheme}-normal.png`,
            );
            for (const variant of ['light', 'dark', 'color', 'image', 'image-color'] as const) {
                await page.mouse.move(0, 0);
                const cardTheme = variant === 'light' || variant === 'dark' ? variant : 'default';
                const hasColor = variant === 'color' || variant === 'image-color';
                const hasImage = variant === 'image' || variant === 'image-color';
                const imageSrc = `/story-assets/img-bg_nopadding_4-12_${colorScheme}.png`;
                const card = page.locator(`[data-qa="background-${variant}"] .pc-background-card`);
                const layer = card.locator('.pc-background-card__image');
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
                await card.hover();
                await checkBackground(true);
            }
        });
    });
}
