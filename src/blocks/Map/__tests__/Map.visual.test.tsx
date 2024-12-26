import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default, Direction, MapsTypes, Size} from './helpers';

const DEFAULT_MAP_DELAY = 10 * 1000;

test.describe('Map', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<Default />);
        await delay(DEFAULT_MAP_DELAY);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-map')]});
    });

    test('render stories <Size>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<Size />);
        await delay(DEFAULT_MAP_DELAY);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-map')]});
    });

    test('render stories <Direction>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<Direction />);
        await delay(DEFAULT_MAP_DELAY);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-map')]});
    });

    test('render stories <MapsTypes>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<MapsTypes />);
        await delay(DEFAULT_MAP_DELAY);
        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-map')]});
    });
});
