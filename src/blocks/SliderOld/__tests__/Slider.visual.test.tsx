import {test} from '../../../../playwright/core/index';

import {
    AutoPlay,
    Banners,
    Default,
    QuoteCards,
    SlidesToShow,
    WithoutArrows,
    WithoutDots,
} from './helpers';

test.describe('Slider Old', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <QuoteCards>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<QuoteCards />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Banners>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Banners />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <AutoPlay>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<AutoPlay />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithoutArrows>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithoutArrows />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithoutDots>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithoutDots />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <SlidesToShow>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<SlidesToShow />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
