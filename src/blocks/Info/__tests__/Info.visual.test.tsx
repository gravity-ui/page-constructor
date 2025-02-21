import {test} from '../../../../playwright/core/index';

import {Default, LightTheme, WithContentList} from './helpers';

test.describe('Info', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithContentList>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithContentList />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <LightTheme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<LightTheme />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
