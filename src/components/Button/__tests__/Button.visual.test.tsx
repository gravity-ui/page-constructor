import {expect, test} from '../../../../playwright/core/index';

import {LegacyContrast} from './LegacyContrast';
import {Default, Icons, ThemesSizes, Width} from './helpers';

test.describe('Button', () => {
    test('should preserve disabled contrast links and buttons', async ({
        mount,
        page,
        expectScreenshot,
    }) => {
        await mount(<LegacyContrast />);
        const disabledLink = page.locator('[data-qa="flat-contrast-link-disabled"]');
        const enabledLink = page.locator('[data-qa="flat-contrast-link-enabled"]');
        await expect(disabledLink).toHaveAttribute('aria-disabled', 'true');
        const enabledColor = await enabledLink.evaluate(
            (element) => getComputedStyle(element).color,
        );
        await expect(disabledLink).not.toHaveCSS('color', enabledColor);
        await expectScreenshot();
    });

    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ThemesSizes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ThemesSizes />);
        await defaultDelay();

        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Width>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Width />);
        await defaultDelay();

        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Icons>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Icons />);
        await defaultDelay();

        await expectScreenshot({skipTheme: 'dark'});
    });
});
