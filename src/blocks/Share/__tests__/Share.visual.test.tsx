import {test} from '../../../../playwright/core/index';

import {CustomTitle, Default} from './helpers';

test.describe('Share', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <CustomTitle>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<CustomTitle />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
