import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';

import {
    BasicCard,
    CardLayout,
    ColorTokens,
    ControlPosition,
    Default,
    GravityIcons,
    HoverEffects,
    MediaCard,
    NestedColorFallbacks,
    PriceDetailed,
    Sizes,
    WithBorder,
    WithContentList,
    WithIcon,
    WithUrl,
} from './helpers';

test.describe('BasicCard', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithIcon>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithIcon />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBorder>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithBorder />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithUrl>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithUrl />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithContentList>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithContentList />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ControlPosition>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ControlPosition />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Sizes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Sizes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <GravityIcons>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<GravityIcons />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <HoverEffects>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<HoverEffects />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`card colors ${colorScheme}`, () => {
        test.use({colorScheme});

        for (const border of ['shadow', 'line', 'none'] as const) {
            test(`${border}: inherited colors and real hover`, async ({mount, page}) => {
                await mount(
                    <div
                        style={
                            {
                                width: 360,
                                padding: 16,
                                '--pc-card-background-color': '#123456',
                                '--pc-card-background-color-hover': '#234567',
                                '--pc-card-outlined-background-color': 'transparent',
                                '--pc-card-outlined-background-color-hover': '#345678',
                                '--pc-card-border-color': '#456789',
                                '--pc-card-border-color-hover': '#56789a',
                            } as React.CSSProperties
                        }
                    >
                        <BasicCard title="Card" border={border} url="#card" />
                    </div>,
                );
                const card = page.locator('.pc-basic-card');
                await expect(card).toHaveCSS(
                    'background-color',
                    border === 'line' ? 'rgba(0, 0, 0, 0)' : 'rgb(18, 52, 86)',
                );
                await expect(page.locator('.playwright-wrapper-test')).toHaveScreenshot(
                    `card-colors-${colorScheme}-${border}-normal.png`,
                );
                await card.hover();
                await expect(card).toHaveCSS(
                    'background-color',
                    border === 'line' ? 'rgb(52, 86, 120)' : 'rgb(35, 69, 103)',
                );
                if (border === 'line') {
                    await expect(card).toHaveCSS('border-top-color', 'rgb(86, 120, 154)');
                } else {
                    await expect(card).toHaveCSS('border-top-width', '0px');
                }
                await expect(page.locator('.playwright-wrapper-test')).toHaveScreenshot(
                    `card-colors-${colorScheme}-${border}-hover.png`,
                );
            });
        }
    });
}

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`card color fallbacks ${colorScheme}`, () => {
        test.use({colorScheme});

        test('nested section and inherited hover', async ({mount, page}) => {
            await mount(<ColorTokens />);
            const local = page
                .locator('.pc-basic-card')
                .filter({hasText: 'Local HEX, inherited hover'});
            await expect(local).toHaveCSS('background-color', 'rgb(234, 241, 255)');
            const inheritedHover = await local.evaluate((el) =>
                getComputedStyle(el).getPropertyValue('--g-color-base-generic-hover').trim(),
            );
            await local.hover();
            await expect(local).toHaveCSS('background-color', inheritedHover);
            const ownHover = page
                .locator('.pc-basic-card')
                .filter({hasText: 'Local HEX and hover'});
            await ownHover.hover();
            await expect(ownHover).toHaveCSS('background-color', 'rgb(220, 231, 255)');
            const staticCard = page.locator('.pc-basic-card').filter({hasText: 'Non-interactive'});
            await staticCard.hover();
            await expect(staticCard).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
            await expect(staticCard).toHaveCSS('transform', 'none');
        });

        test('outlined fallback resolves in nested section', async ({mount, page}) => {
            await mount(<NestedColorFallbacks />);
            const card = page.locator('.pc-basic-card');
            await expect(card).toHaveCSS('background-color', 'rgb(234, 241, 255)');
            await card.hover();
            await expect(card).toHaveCSS('background-color', 'rgb(234, 241, 255)');
        });

        for (const border of ['shadow', 'line', 'none'] as const) {
            test(`${border}: legacy defaults, new background and isolated hover`, async ({
                mount,
                page,
            }) => {
                await mount(
                    <div data-qa="scope">
                        <BasicCard title="Card" border={border} url="#card" />
                    </div>,
                );
                const card = page.locator('.pc-basic-card');
                const tokens = await card.evaluate((el) => {
                    const style = getComputedStyle(el);
                    return {
                        base: style.getPropertyValue('--g-color-base-float').trim(),
                        hover: style.getPropertyValue('--pc-color-base-float-hover').trim(),
                    };
                });
                await expect(card).toHaveCSS('background-color', tokens.base);
                await card.hover();
                await expect(card).toHaveCSS(
                    'background-color',
                    border === 'shadow' ? tokens.hover : tokens.base,
                );
                await page.locator('[data-qa=scope]').evaluate((el) => {
                    el.style.setProperty('--pc-card-background-color', '#123456');
                    el.style.setProperty('--pc-card-border-color', '#456789');
                });
                await expect(card).toHaveCSS('background-color', 'rgb(18, 52, 86)');
                if (border === 'line') {
                    await expect(card).toHaveCSS('border-top-color', 'rgb(69, 103, 137)');
                    await page.locator('[data-qa=scope]').evaluate((el) => {
                        el.style.setProperty('--pc-card-outlined-background-color', 'transparent');
                        el.style.setProperty('--pc-card-background-color-hover', '#ffffff');
                    });
                    await expect(card).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
                }
            });
        }

        test('legacy gradient remains a separate animated layer', async ({mount, page}) => {
            await mount(
                <BasicCard
                    title="Gradient"
                    url="#card"
                    hoverBackgroundColor="linear-gradient(red, blue)"
                />,
            );
            const card = page.locator('.pc-basic-card');
            await card.hover();
            await expect
                .poll(() => card.evaluate((el) => getComputedStyle(el, '::before').opacity))
                .toBe('1');
            expect(
                await card.evaluate((el) => getComputedStyle(el, '::before').backgroundImage),
            ).toContain('linear-gradient');
        });
    });
}

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`card color consumers ${colorScheme}`, () => {
        test.use({colorScheme});
        test('shared surfaces and CardLayout isolation', async ({mount, page}) => {
            await mount(
                <div
                    style={
                        {
                            '--pc-card-outlined-background-color': '#123456',
                            '--pc-card-border-color': '#456789',
                        } as React.CSSProperties
                    }
                >
                    <CardLayout background={{border: 'line'}}>
                        <MediaCard border="line" />
                        <PriceDetailed
                            border="line"
                            items={[{title: 'Separate', description: 'Plan'}]}
                        />
                        <PriceDetailed
                            border="line"
                            items={[{title: 'Combined', description: 'Plan'}]}
                            isCombined
                        />
                    </CardLayout>
                </div>,
            );
            const cards = page.locator('.pc-card-base-block');
            await expect(cards).toHaveCount(3);
            for (const card of await cards.all()) {
                await expect(card).toHaveCSS('background-color', 'rgb(18, 52, 86)');
                await expect(card).toHaveCSS('border-top-color', 'rgb(69, 103, 137)');
            }
            const layout = page.locator('.pc-card-layout-block__image');
            await expect(layout).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
            const border = await layout.evaluate((el) =>
                getComputedStyle(el).getPropertyValue('--g-color-line-generic').trim(),
            );
            await expect(layout).toHaveCSS('border-top-color', border);
        });
    });
}

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`card color YC theme ${colorScheme}`, () => {
        test.use({colorScheme});
        test('transparent outlines and shared hover', async ({mount, page}) => {
            await mount(
                <div
                    style={
                        {
                            '--pc-card-background-color': 'var(--g-color-base-float)',
                            '--pc-card-background-color-hover':
                                colorScheme === 'dark'
                                    ? 'var(--g-color-base-float-hover)'
                                    : 'var(--g-color-base-float)',
                            '--pc-card-outlined-background-color': 'transparent',
                            '--pc-card-outlined-background-color-hover': 'transparent',
                            '--pc-card-border-color': 'var(--g-color-line-generic)',
                            '--pc-card-border-color-hover': 'var(--g-color-line-generic)',
                        } as React.CSSProperties
                    }
                >
                    {(['shadow', 'line', 'none'] as const).map((border) => (
                        <BasicCard key={border} title={border} border={border} url="#card" />
                    ))}
                </div>,
            );
            for (const card of await page.locator('.pc-basic-card').all()) {
                const tokens = await card.evaluate((el) => {
                    const style = getComputedStyle(el);
                    return {
                        base: style.getPropertyValue('--g-color-base-float').trim(),
                        hover: style.getPropertyValue('--pc-color-base-float-hover').trim(),
                        border: style.borderTopColor,
                    };
                });
                const outlined = (await card.textContent()) === 'line';
                await expect(card).toHaveCSS(
                    'background-color',
                    outlined ? 'rgba(0, 0, 0, 0)' : tokens.base,
                );
                await card.hover();
                await expect(card).toHaveCSS(
                    'background-color',
                    outlined ? 'rgba(0, 0, 0, 0)' : tokens.hover,
                );
                if (outlined) {
                    await expect(card).toHaveCSS('border-top-color', tokens.border);
                }
                await page.mouse.move(0, 0);
            }
        });
    });
}
