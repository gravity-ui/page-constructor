import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default, Tick} from './helpers';

test.describe('Table', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Tick>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Tick />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
