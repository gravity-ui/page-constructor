import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';
import BasicCard from '../BasicCard';

import {
    ControlPosition,
    Custom,
    Default,
    DefaultTokens,
    GravityIcons,
    HoverEffects,
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
    test.describe(`card color fallbacks ${colorScheme}`, () => {
        test.use({colorScheme});

        test('static cards ignore hover tokens', async ({mount, page}) => {
            await mount(
                <div
                    style={
                        {
                            '--pc-card-background-color': 'rgb(18, 52, 86)',
                            '--pc-card-background-color-hover': 'rgb(35, 69, 103)',
                            '--pc-card-outlined-background-color': 'rgb(52, 86, 120)',
                            '--pc-card-outlined-background-color-hover': 'rgb(69, 103, 137)',
                            '--pc-card-border-color': 'rgb(86, 120, 154)',
                            '--pc-card-border-color-hover': 'rgb(103, 137, 171)',
                        } as React.CSSProperties
                    }
                >
                    {(['shadow', 'line', 'none'] as const).map((border) => (
                        <BasicCard key={border} title={border} border={border} url="" />
                    ))}
                </div>,
            );
            for (const border of ['shadow', 'line', 'none']) {
                const card = page.locator(`.pc-basic-card.pc-card-base-block_border_${border}`);
                await card.hover();
                await expect(card).toHaveCSS(
                    'background-color',
                    border === 'line' ? 'rgb(52, 86, 120)' : 'rgb(18, 52, 86)',
                );
                await expect(card).toHaveCSS('transform', 'none');
                if (border === 'line') {
                    await expect(card).toHaveCSS('border-top-color', 'rgb(86, 120, 154)');
                }
            }
        });

        test('nested section and inherited hover', async ({mount, page}) => {
            await mount(
                <div
                    style={
                        {
                            '--pc-card-background-color-hover': 'var(--g-color-base-generic-hover)',
                        } as React.CSSProperties
                    }
                >
                    <div
                        style={
                            {
                                '--pc-card-background-color':
                                    colorScheme === 'dark'
                                        ? 'rgb(38, 52, 73)'
                                        : 'rgb(234, 241, 255)',
                            } as React.CSSProperties
                        }
                    >
                        <BasicCard
                            title="Local color, inherited hover"
                            border="none"
                            url="#colors"
                        />
                    </div>
                    <div
                        style={
                            {
                                '--pc-card-background-color-hover':
                                    colorScheme === 'dark'
                                        ? 'rgb(52, 71, 98)'
                                        : 'rgb(220, 231, 255)',
                            } as React.CSSProperties
                        }
                    >
                        <BasicCard title="Local color and hover" border="shadow" url="#colors" />
                    </div>
                </div>,
            );
            const local = page
                .locator('.pc-basic-card')
                .filter({hasText: 'Local color, inherited hover'});
            await expect(local).toHaveCSS(
                'background-color',
                colorScheme === 'dark' ? 'rgb(38, 52, 73)' : 'rgb(234, 241, 255)',
            );
            const inheritedHover = await local.evaluate((el) =>
                getComputedStyle(el).getPropertyValue('--g-color-base-generic-hover').trim(),
            );
            await local.hover();
            await expect(local).toHaveCSS('background-color', inheritedHover);
            const ownHover = page
                .locator('.pc-basic-card')
                .filter({hasText: 'Local color and hover'});
            await ownHover.hover();
            await expect(ownHover).toHaveCSS(
                'background-color',
                colorScheme === 'dark' ? 'rgb(52, 71, 98)' : 'rgb(220, 231, 255)',
            );
        });

        test('fallback resolves in nested section for every border', async ({mount, page}) => {
            await mount(
                <div
                    style={
                        {'--pc-card-background-color': 'rgb(245, 246, 247)'} as React.CSSProperties
                    }
                >
                    <div
                        style={
                            {
                                '--pc-card-background-color':
                                    colorScheme === 'dark'
                                        ? 'rgb(38, 52, 73)'
                                        : 'rgb(234, 241, 255)',
                            } as React.CSSProperties
                        }
                    >
                        {(['shadow', 'line', 'none'] as const).map((border) => (
                            <BasicCard key={border} title={border} border={border} url="#colors" />
                        ))}
                    </div>
                </div>,
            );
            for (const border of ['shadow', 'line', 'none']) {
                const card = page.locator(`.pc-basic-card.pc-card-base-block_border_${border}`);
                const expected = colorScheme === 'dark' ? 'rgb(38, 52, 73)' : 'rgb(234, 241, 255)';
                await expect(card).toHaveCSS('background-color', expected);
                await card.hover();
                await expect(card).toHaveCSS('background-color', expected);
            }
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
                    el.style.setProperty('--pc-card-background-color', 'rgb(18, 52, 86)');
                    el.style.setProperty('--pc-card-border-color', 'rgb(69, 103, 137)');
                });
                await expect(card).toHaveCSS('background-color', 'rgb(18, 52, 86)');
                if (border === 'line') {
                    await expect(card).toHaveCSS('border-top-color', 'rgb(69, 103, 137)');
                    await page.locator('[data-qa=scope]').evaluate((el) => {
                        el.style.setProperty(
                            '--pc-card-outlined-background-color',
                            'rgb(52, 86, 120)',
                        );
                        el.style.setProperty(
                            '--pc-card-background-color-hover',
                            'rgb(255, 255, 255)',
                        );
                    });
                    await expect(card).toHaveCSS('background-color', 'rgb(52, 86, 120)');
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
    test.describe(`card color themes ${colorScheme}`, () => {
        test.use({colorScheme, viewport: {width: 1600, height: 1200}});

        for (const scope of ['default', 'custom'] as const) {
            test(`${scope}: colors and real hover`, async ({mount, page}) => {
                await mount(scope === 'default' ? <DefaultTokens /> : <Custom />);
                const wrapper = page.locator('.playwright-wrapper-test');
                await expect(wrapper).toHaveScreenshot(
                    `card-colors-${scope === 'default' ? 'story' : 'overrides'}-${colorScheme}-normal.png`,
                );

                const cards = page.locator(`[data-qa="${scope}-colors"] .pc-basic-card`);
                await expect(cards).toHaveCount(3);
                for (const [index, border] of ['shadow', 'line', 'none'].entries()) {
                    await page.mouse.move(0, 0);
                    const card = cards.nth(index);
                    const defaults = await card.evaluate((el) => {
                        const style = getComputedStyle(el);
                        return {
                            background: style.getPropertyValue('--g-color-base-float').trim(),
                            hover: style.getPropertyValue('--pc-color-base-float-hover').trim(),
                            border: style.getPropertyValue('--g-color-line-generic').trim(),
                        };
                    });
                    const background =
                        colorScheme === 'dark' ? 'rgb(48, 52, 59)' : 'rgb(239, 242, 248)';
                    const hover = colorScheme === 'dark' ? 'rgb(61, 67, 77)' : 'rgb(227, 232, 242)';
                    const outline =
                        colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
                    const outlineHover =
                        colorScheme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
                    const customBackground = border === 'line' ? 'rgba(0, 0, 0, 0)' : background;
                    const customHover = border === 'line' ? 'rgba(0, 0, 0, 0)' : hover;
                    const defaultHover = border === 'shadow' ? defaults.hover : defaults.background;
                    await expect(card).toHaveCSS(
                        'background-color',
                        scope === 'default' ? defaults.background : customBackground,
                    );
                    if (border === 'line') {
                        await expect(card).toHaveCSS(
                            'border-top-color',
                            scope === 'default' ? defaults.border : outline,
                        );
                    } else {
                        await expect(card).toHaveCSS('border-top-width', '0px');
                    }
                    await card.hover();
                    await expect(card).not.toHaveCSS('transform', 'none');
                    await expect(card).toHaveCSS(
                        'background-color',
                        scope === 'default' ? defaultHover : customHover,
                    );
                    if (border === 'line') {
                        await expect(card).toHaveCSS(
                            'border-top-color',
                            scope === 'default' ? defaults.border : outlineHover,
                        );
                    }
                    await expect(wrapper).toHaveScreenshot(
                        `card-colors-story-${colorScheme}-${border}-${scope}-hover.png`,
                    );
                }
            });
        }
    });
}
