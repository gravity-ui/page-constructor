import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default, Direction, MapsTypes, Size} from './helpers';

const DEFAULT_MAP_DELAY = 20 * 1000;

test.describe('Map', () => {
    test.skip('render stories <Default>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Default />);
        await delay(DEFAULT_MAP_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <Size>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Size />);
        await delay(DEFAULT_MAP_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <Direction>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Direction />);
        await delay(DEFAULT_MAP_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <MapsTypes>', async ({mount, expectScreenshot, delay}) => {
        await mount(<MapsTypes />);
        await delay(DEFAULT_MAP_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });
});
