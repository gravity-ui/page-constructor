import {test} from '../../../../playwright/core/index';

import {
    BackgroundColor,
    Border,
    BorderRadius,
    Content,
    ControlPosition,
    Default,
    DirectionReverse,
    Margins,
    Size,
    WithUrl,
} from './helpers';

test.describe('ImageCard', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Margins>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Margins />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <DirectionReverse>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DirectionReverse />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Content>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Content />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BackgroundColor>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BackgroundColor />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithUrl>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithUrl />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Border>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Border />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <BorderRadius>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<BorderRadius />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ControlPosition>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ControlPosition />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Size>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Size />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
