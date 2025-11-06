import {test} from '../../../../playwright/core/index';

import {Default, Rounded} from './helpers';

test.describe('FullWidthBackground', () => {
    test('default', async ({mount, expectScreenshot, defaultDelay, page}) => {
        await page.setViewportSize({width: 850, height: 150});
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('rounded', async ({mount, expectScreenshot, defaultDelay, page}) => {
        await page.setViewportSize({width: 850, height: 150});
        await mount(<Rounded />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
