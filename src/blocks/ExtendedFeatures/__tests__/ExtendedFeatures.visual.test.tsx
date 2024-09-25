import React from 'react';

import {test} from '../../../../playwright/core/index';

import {ColSizes, Default, WithLabel} from './helpers';

test.describe('ExtendedFeatures', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ColSizes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ColSizes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithLabel>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithLabel />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
