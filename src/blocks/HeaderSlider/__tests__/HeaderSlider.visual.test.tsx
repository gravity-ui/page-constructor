import React from 'react';

import {test} from '../../../../playwright/core/index';

import {AutoPlay, Default} from './helpers';

test.describe('HeaderSlider', () => {
    // skip because of an error: Cannot take screenshot larger than 32767 pixels on any dimension
    test.skip('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    // skip because of an error: Cannot take screenshot larger than 32767 pixels on any dimension
    test.skip('render stories <AutoPlay>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<AutoPlay />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
