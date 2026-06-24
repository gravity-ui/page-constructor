import {test} from '../../../../playwright/core/index';

import {ShowcaseData} from './helpers';

test.describe('Footer', () => {
    test('render stories <Full>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ShowcaseData />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
