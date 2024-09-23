import React from 'react';

import {test} from '../../../../playwright/core/index';

import {
    Default,
    Size,
    TextAlignCenter,
    TextWidth,
    Theme,
    WithBackgroundColor,
    WithBackgroundImageAndColor,
    WithFiles,
} from './helpers';

test.describe('ContentLayout', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithFiles>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithFiles />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Size>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Size />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBackgroundColor>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<WithBackgroundColor />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBackgroundImageAndColor>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<WithBackgroundImageAndColor />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <TextAlignCenter>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<TextAlignCenter />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Theme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Theme />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <TextWidth>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<TextWidth />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
