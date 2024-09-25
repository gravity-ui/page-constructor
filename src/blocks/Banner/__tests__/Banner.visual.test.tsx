import React from 'react';

import {test} from '../../../../playwright/core/index';

import {DarkTheme, Default} from './helpers';

test.describe('Banner', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <DarkTheme>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DarkTheme />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
