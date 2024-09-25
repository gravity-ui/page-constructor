import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default, WithDescription} from './helpers';

test.describe('Companies', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithDescription>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithDescription />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
