import {test} from '../../../../playwright/core/index';

import {ColumnsOnly, Default, Full, WithBackground} from './helpers';

test.describe('Footer', () => {
    test('render stories <Full>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Full />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBackground>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithBackground />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ColumnsOnly>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ColumnsOnly />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
