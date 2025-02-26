import {test} from '../../../../playwright/core/index';

import {Default, DifferentContent, Themed} from './helpers';

test.describe('PriceCard', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <DifferentContent>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DifferentContent />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Themed>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Themed />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
