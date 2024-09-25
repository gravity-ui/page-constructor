import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default, ThemesSizes, Width} from './helpers';

test.describe('Button', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ThemesSizes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ThemesSizes />);
        await defaultDelay();

        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Width>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Width />);
        await defaultDelay();

        await expectScreenshot({skipTheme: 'dark'});
    });
});
