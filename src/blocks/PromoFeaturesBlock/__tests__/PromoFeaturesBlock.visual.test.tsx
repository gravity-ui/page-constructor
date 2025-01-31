import {test} from '../../../../playwright/core/index';

import {DefaultTheme, GreyTheme} from './helpers';

test.describe('PromoFeaturesBlock', () => {
    test('render stories <DefaultTheme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DefaultTheme />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <GreyTheme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<GreyTheme />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
