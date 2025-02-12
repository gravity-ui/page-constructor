import {test} from '../../../../playwright/core/index';

import {MarkedList, Settings, WithBlackText} from './helpers';

test.describe('PriceDetailed', () => {
    test('render stories <MarkedList>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<MarkedList />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Settings>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Settings />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBlackText>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithBlackText />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
