import React from 'react';

import {test} from '../../../../playwright/core/index';

import {Default, Direction, MapsTypes, Size} from './helpers';

test.describe('Map', () => {

    test('render stories <Default>', async ({mount, expectScreenshot, page}) => {
        await mount(<Default />);

        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-map')]});
    });

    test('render stories <Size>', async ({mount, expectScreenshot, page}) => {
        await mount(<Size />);

        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-map')]});
    });

    test('render stories <Direction>', async ({mount, expectScreenshot, page}) => {
        await mount(<Direction />);

        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-map')]});
    });

    test('render stories <MapsTypes>', async ({mount, expectScreenshot, page}) => {
        await mount(<MapsTypes />);

        await expectScreenshot({skipTheme: 'dark', mask: [page.locator('.pc-map')]});
    });
});
