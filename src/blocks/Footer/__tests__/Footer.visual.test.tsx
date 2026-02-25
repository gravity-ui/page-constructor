import {test} from '../../../../playwright/core/index';

import {Full} from './helpers';

test.describe('Footer', () => {
    test('render stories <Full>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Full />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
