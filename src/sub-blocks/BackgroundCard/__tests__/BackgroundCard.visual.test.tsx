import {test} from '../../../../playwright/core/index';

import {
    BackgroundColor,
    BorderLine,
    BorderWithBackground,
    CardThemes,
    ControlPosition,
    Default,
    Paddings,
    WithBackgroundImage,
    WithUrl,
} from './helpers';

test.describe('BackgroundCard', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBackgroundImage>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<WithBackgroundImage />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Paddings>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Paddings />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <CardThemes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<CardThemes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BorderLine>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BorderLine />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BackgroundColor>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BackgroundColor />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BorderWithBackground>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<BorderWithBackground />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithUrl>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithUrl />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ControlPosition>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ControlPosition />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
