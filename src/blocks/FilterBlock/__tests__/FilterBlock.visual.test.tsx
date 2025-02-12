import {test} from '../../../../playwright/core/index';

import {Default, WithCustomAllTag, WithDefaultAllTag} from './helpers';

test.describe('FilterBlock', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithCustomAllTag>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithCustomAllTag />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithDefaultAllTag>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithDefaultAllTag />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
