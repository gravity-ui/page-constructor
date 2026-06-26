import {test} from '../../../../playwright/core/index';

import {
    ColumnsLayout,
    FloorsCustomization,
    LinksAlignment,
    LinksOverflowStrategy,
    LogoPlacement,
    ShowcaseData,
} from './helpers';

test.describe('Footer', () => {
    test('render stories <Full>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ShowcaseData />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <FloorsCustomization>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<FloorsCustomization />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ColumnsLayout>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ColumnsLayout />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <LogoPlacement>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<LogoPlacement />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <LinksOverflowStrategy>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<LinksOverflowStrategy />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <LinksAlignment>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<LinksAlignment />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
