import {test} from '../../../../playwright/core/index';

import {Centered, ContentVariables, Default, Size, Theme} from './helpers';

test.describe('Content', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Size>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Size />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Centered>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Centered />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Theme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Theme />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ContentVariables>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ContentVariables />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
