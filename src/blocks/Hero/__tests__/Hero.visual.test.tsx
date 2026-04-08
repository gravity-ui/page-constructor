import {test} from '../../../../playwright/core/index';

import {
    Background,
    Breadcrumbs,
    ContentList,
    Default,
    MediaFit,
    RoundCorners,
    Theme,
    VerticalOffset,
} from './helpers';

test.describe('Hero', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot();
    });

    test('render stories <Breadcrumbs>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Breadcrumbs />);
        await defaultDelay();
        await expectScreenshot();
    });

    test('render stories <ContentList>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ContentList />);
        await defaultDelay();
        await expectScreenshot();
    });

    test('render stories <Background>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Background />);
        await defaultDelay();
        await expectScreenshot();
    });

    test('render stories <RoundCorners>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<RoundCorners />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <VerticalOffset>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<VerticalOffset />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Theme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Theme />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <MediaFit>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<MediaFit />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
