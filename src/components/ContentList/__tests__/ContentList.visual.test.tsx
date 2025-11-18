import {test} from '../../../../playwright/core/index';

import {Default, Sizes, Themes, WithoutIcon, WithoutText, WithoutTitle} from './helpers';

test.describe('ContentList', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithoutText>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithoutText />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithoutTitle>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithoutTitle />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithoutIcon>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithoutIcon />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Sizes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Sizes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Themes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Themes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
