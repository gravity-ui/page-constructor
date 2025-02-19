import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default} from './helpers';

test.describe('HubspotForm', () => {
    test.skip('render stories <Default>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Default />);
        await delay(10 * 1000);
        await expectScreenshot({skipTheme: 'dark'});
    });
});
