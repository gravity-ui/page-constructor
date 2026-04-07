import {test} from '../../../../playwright/core/index';

import {Background, Breadcrumbs, Default, Full, Image, VerticalOffset} from './helpers';

test.describe('Hero', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot();
    });

    test('render stories <Breadcrumbs>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Breadcrumbs />);
        await defaultDelay();
        await expectScreenshot();
    });

    test('render stories <Background>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Background />);
        await defaultDelay();
        await expectScreenshot();
    });

    test('render stories <VerticalOffset>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<VerticalOffset />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Image>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Image />);
        await defaultDelay();
        await expectScreenshot();
    });

    test('render stories <Full>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Full />);
        await defaultDelay();
        await expectScreenshot();
    });
});
