/* eslint-disable testing-library/prefer-screen-queries -- Playwright uses browser locators. */
import {expect} from '@playwright/experimental-ct-react';

import {test} from '../../../../playwright/core/index';

import {Centered, Collapsible, Default, WithAllTag, WithCustomAllTag} from './helpers';

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
