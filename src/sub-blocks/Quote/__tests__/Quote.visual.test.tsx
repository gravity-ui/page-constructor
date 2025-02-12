import {test} from '../../../../playwright/core/index';

import {BorderLine, DarkTheme, Default, QuoteTypes} from './helpers';

test.describe('Quote', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <QuoteTypes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<QuoteTypes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BorderLine>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BorderLine />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <DarkTheme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DarkTheme />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
