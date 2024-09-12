import React from 'react';

import {test} from '../../../../playwright/core/index';

import {ColSize, Default, WithBackground, WithCustomIndents} from './helpers';

test.describe('CardLayout', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot();
    });

    test('render stories <ColSize>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ColSize />);
        await defaultDelay();

        await expectScreenshot();
    });

    test('render stories <WithCustomIndents>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithCustomIndents />);
        await defaultDelay();

        await expectScreenshot();
    });

    test('render stories <WithBackground>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithBackground />);
        await defaultDelay();

        await expectScreenshot();
    });
});
