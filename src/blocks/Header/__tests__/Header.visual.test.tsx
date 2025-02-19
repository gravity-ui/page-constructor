import React from 'react';

import {test} from '../../../../playwright/core/index';

import {
    Background,
    Breadcrumbs,
    Centered,
    DarkTheme,
    Default,
    FullWidthMediaBackground,
    FullWithBackground,
    Image,
    MediaViewFit,
    Size,
    VerticalOffset,
} from './helpers';

test.describe('Header', () => {
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

    test('render stories <Image>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Image />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <VerticalOffset>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<VerticalOffset />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Background>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Background />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <FullWithBackground>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<FullWithBackground />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <FullWidthMediaBackground>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<FullWidthMediaBackground />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <DarkTheme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DarkTheme />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Breadcrumbs>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Breadcrumbs />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <MediaViewFit>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<MediaViewFit />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
