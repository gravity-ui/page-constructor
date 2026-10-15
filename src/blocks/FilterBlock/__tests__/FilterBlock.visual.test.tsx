/* eslint-disable testing-library/prefer-screen-queries -- Playwright uses browser locators. */
import {expect} from '@playwright/experimental-ct-react';

import {test} from '../../../../playwright/core/index';

import {
    Centered,
    Collapsible,
    CollapsibleResponsiveRows,
    CollapsibleWithFewCards,
    Default,
    WithAllTag,
    WithCustomAllTag,
} from './helpers';

test.describe('FilterBlock', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithAllTag>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithAllTag />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithCustomAllTag>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithCustomAllTag />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Centered>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Centered />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});

test('FilterBlock responsive collapsing', async ({mount, page}, testInfo) => {
    await page.setViewportSize({width: 1280, height: 900});
    const component = await mount(
        <Collapsible expandButtonText="Expand" collapseButtonText="Collapse" />,
    );
    const cards = component.locator('.pc-card-layout-block__item');
    await expect(cards).toHaveCount(8);
    await component.screenshot({path: testInfo.outputPath('collapsed-desktop.png')});
    await page.getByRole('button', {name: 'Expand', exact: true}).click();
    await expect(page.getByRole('button', {name: 'Collapse', exact: true})).toHaveAttribute(
        'aria-expanded',
        'true',
    );
    await page.getByRole('button', {name: 'Collapse', exact: true}).click();
    await expect(cards).toHaveCount(8);
    await page.setViewportSize({width: 800, height: 900});
    await expect(cards).toHaveCount(4);
    await page.setViewportSize({width: 375, height: 900});
    await expect(cards).toHaveCount(3);
});

test('FilterBlock shows 8, 9 and 8 cards across breakpoints', async ({mount, page}) => {
    await page.setViewportSize({width: 1280, height: 900});
    const component = await mount(<CollapsibleResponsiveRows />);
    const cards = component.locator('.pc-card-layout-block__item');
    for (const [width, count] of [
        [1280, 8],
        [1185, 8],
        [1184, 9],
        [1081, 9],
        [1080, 8],
        [769, 8],
        [768, 3],
        [577, 3],
        [576, 3],
    ]) {
        await page.setViewportSize({width, height: 900});
        await expect(cards).toHaveCount(count);
    }
});

test('FilterBlock with few cards has no toggle', async ({mount, page}) => {
    const component = await mount(<CollapsibleWithFewCards expandButtonText="Expand" />);
    for (const width of [1280, 800, 375]) {
        await page.setViewportSize({width, height: 900});
        await expect(component.locator('.pc-card-layout-block__item')).toHaveCount(3);
        await expect(page.getByRole('button', {name: 'Expand', exact: true})).toHaveCount(0);
    }
});

for (const width of [1280, 375]) {
    test(`FilterBlock toggle appearance at ${width}px`, async ({
        mount,
        page,
        expectScreenshot,
        defaultDelay,
    }) => {
        await page.setViewportSize({width, height: 900});
        await mount(
            <div style={{width: width - 40}}>
                <Collapsible expandButtonText="Expand" collapseButtonText="Collapse" />
            </div>,
        );
        await defaultDelay();
        const toggle = page.getByRole('button', {name: 'Expand', exact: true});
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        await expectScreenshot({screenshotName: `FilterBlock collapsed ${width}`});
        await page.emulateMedia({colorScheme: 'light'});
        await toggle.click();
        const collapse = page.getByRole('button', {name: 'Collapse', exact: true});
        await expect(collapse).toHaveAttribute('aria-expanded', 'true');
    });
}

for (const [width, count] of [
    [1081, 9],
    [1080, 8],
    [769, 8],
    [768, 3],
    [577, 3],
    [576, 3],
]) {
    test(`FilterBlock breakpoint appearance at ${width}px`, async ({
        mount,
        page,
        expectScreenshot,
        defaultDelay,
    }) => {
        await page.setViewportSize({width, height: 900});
        const component = await mount(
            <div style={{width: width - 40}}>
                <CollapsibleResponsiveRows />
            </div>,
        );
        await expect(component.locator('.pc-card-layout-block__item')).toHaveCount(count);
        await defaultDelay();
        await expectScreenshot({screenshotName: `FilterBlock breakpoint ${width}`});
    });
}
