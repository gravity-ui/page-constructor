import * as React from 'react';

import {expect, test} from '../../../../playwright/core/index';
import BasicCard from '../BasicCard';

import {
    ColorTokens,
    ColorTokensOverrides,
    ControlPosition,
    Default,
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
    test.describe(`card colors ${colorScheme}`, () => {
        test.use({colorScheme});

        test('render story <ColorTokens> and real hover', async ({mount, page}) => {
            await mount(<ColorTokens />);
            const wrapper = page.locator('.playwright-wrapper-test');
            await expect(wrapper).toHaveScreenshot(`card-colors-story-${colorScheme}-normal.png`);
            for (const border of ['shadow', 'line', 'none']) {
                const cards = page.locator(`section[aria-label="${border}"] .pc-basic-card`);
                await expect(cards).toHaveCount(4);
                for (const row of [0, 1]) {
                    const card = cards.nth(row);
                    const normal = await card.evaluate((el) => ({
                        background: getComputedStyle(el).backgroundColor,
                        border: getComputedStyle(el).borderTopColor,
                    }));
                    await card.hover();
                    await expect(card).toHaveCSS('background-color', normal.background);
                    await expect(card).toHaveCSS('border-top-color', normal.border);
                    await expect(card).toHaveCSS('transform', 'none');
                }
                for (const row of [2, 3]) {
                    await cards.nth(row).hover();
                    await expect(cards.nth(row)).not.toHaveCSS('transform', 'none');
                    await expect(wrapper).toHaveScreenshot(
                        `card-colors-story-${colorScheme}-${border}-${['default', 'custom'][row - 2]}-hover.png`,
                    );
                }
            }
        });

        test('render story <ColorTokensOverrides> and section overrides', async ({mount, page}) => {
            await mount(<ColorTokensOverrides />);
            const wrapper = page.locator('.playwright-wrapper-test');
            await expect(wrapper).toHaveScreenshot(
                `card-colors-overrides-${colorScheme}-normal.png`,
            );
            for (const scope of ['site', 'section']) {
                const cards = page.locator(`[data-qa="${scope}-colors"] .pc-basic-card`);
                for (const [index, border] of ['shadow', 'line'].entries()) {
                    await page.mouse.move(0, 0);
                    const card = cards.nth(index);
                    const token =
                        border === 'line'
                            ? '--pc-card-outlined-background-color'
                            : '--pc-card-background-color';
                    const resolveColor = async (name: string) =>
                        card.evaluate((el, variable) => {
                            const probe = document.createElement('span');
                            probe.style.color = `var(${variable})`;
                            el.append(probe);
                            const result = getComputedStyle(probe).color;
                            probe.remove();
                            return result;
                        }, name);
                    await expect(card).toHaveCSS('background-color', await resolveColor(token));
                    if (scope === 'section') {
                        const parentCard = page
                            .locator('[data-qa="site-colors"] .pc-basic-card')
                            .nth(index);
                        const parentColor = await parentCard.evaluate(
                            (el) => getComputedStyle(el).backgroundColor,
                        );
                        await expect(card).not.toHaveCSS('background-color', parentColor);
                    }
                    if (border === 'line') {
                        await expect(card).toHaveCSS(
                            'border-top-color',
                            await resolveColor('--pc-card-border-color'),
                        );
                    }
                    if (scope === 'site') {
                        continue;
                    }
                    await card.hover();
                    await expect(card).toHaveCSS(
                        'background-color',
                        await resolveColor(`${token}-hover`),
                    );
                    if (border === 'line') {
                        await expect(card).toHaveCSS(
                            'border-top-color',
                            await resolveColor('--pc-card-border-color-hover'),
                        );
                    }
                    await expect(wrapper).toHaveScreenshot(
                        `card-colors-overrides-${colorScheme}-${scope}-${border}-hover.png`,
                    );
                }
            }
        });
    });
}

for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`card color fallbacks ${colorScheme}`, () => {
        test.use({colorScheme});

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
