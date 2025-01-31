import {test} from '../../../../playwright/core/index';

import {
    Caption,
    Centered,
    Default,
    Direction,
    MediaBorder,
    OnlyMedia,
    OnlyText,
    TabsButtonsColSizes,
} from './helpers';

test.describe('Tabs', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <OnlyMedia>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<OnlyMedia />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <OnlyText>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<OnlyText />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <TabsButtonsColSizes>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<TabsButtonsColSizes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Centered>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Centered />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Direction>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Direction />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Caption>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Caption />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <MediaBorder>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<MediaBorder />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
