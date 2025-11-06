import {test} from '../../../../playwright/core/index';

import {
    AllVariants,
    Default,
    Horizontal,
    NavigationIcon,
    OpenHorizontal,
    OpenVertical,
    Slow,
    Thin,
    ThinSlow,
    Vertical,
} from './helpers';

test.describe('ToggleArrow', () => {
    test('render <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <Horizontal>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Horizontal />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <Vertical>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Vertical />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <OpenHorizontal>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<OpenHorizontal />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <OpenVertical>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<OpenVertical />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <Thin>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Thin />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <Slow>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Slow />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <ThinSlow>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ThinSlow />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <NavigationIcon>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<NavigationIcon />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <AllVariants>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<AllVariants />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
