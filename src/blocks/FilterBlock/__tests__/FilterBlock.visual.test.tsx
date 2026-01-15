import {test} from '../../../../playwright/core/index';

import {Centered, Default, WithAllTag, WithCustomAllTag} from './helpers';

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
