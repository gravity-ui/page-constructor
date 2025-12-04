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

test.describe('Slider', () => {
    // TODO: re-enable after Swiper update (alpha version)
    test.skip('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    // TODO: re-enable after Swiper update (alpha version)
    test.skip('render stories <QuoteCards>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<QuoteCards />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    // TODO: re-enable after Swiper update (alpha version)
    test.skip('render stories <Banners>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Banners />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <AutoPlay>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<AutoPlay />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    // TODO: re-enable after Swiper update (alpha version)
    test.skip('render stories <WithoutArrows>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithoutArrows />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    // TODO: re-enable after Swiper update (alpha version)
    test.skip('render stories <WithoutDots>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithoutDots />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    // TODO: re-enable after Swiper update (alpha version)
    test.skip('render stories <SlidesToShow>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<SlidesToShow />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
