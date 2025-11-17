import {test} from '../../../../playwright/core/index';

import {
    ControlPosition,
    Default,
    GravityIcons,
    HoverEffects,
    Sizes,
    WithBorder,
    WithContentList,
    WithIcon,
    WithUrl,
} from './helpers';

test.describe('BasicCard', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithIcon>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithIcon />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBorder>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithBorder />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithUrl>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithUrl />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithContentList>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithContentList />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ControlPosition>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ControlPosition />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Sizes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Sizes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <GravityIcons>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<GravityIcons />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <HoverEffects>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<HoverEffects />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
