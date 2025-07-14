import {test} from '../../../../playwright/core/index';

import {
    ControlPosition,
    Default,
    Fullscreen,
    MetaInfo,
    Sizes,
    WithContentList,
    WithIcon,
    Youtube,
} from './helpers';

test.describe('LayoutItem', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ControlPosition>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ControlPosition />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Fullscreen>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Fullscreen />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <MetaInfo>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<MetaInfo />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithContentList>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithContentList />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithIcon>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithIcon />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Youtube>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Youtube />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Sizes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Sizes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
