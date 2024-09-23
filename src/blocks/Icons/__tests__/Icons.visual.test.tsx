import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default, HeaderColSize, Size, WithText} from './helpers';

test.describe('Icons', () => {
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

    test('render stories <WithText>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithText />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <HeaderColSize>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<HeaderColSize />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
