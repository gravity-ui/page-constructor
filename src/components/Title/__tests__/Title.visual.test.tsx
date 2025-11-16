import {test} from '../../../../playwright/core/index';

import {
    CustomTitle,
    Default,
    Sizes,
    SizesWithLinks,
    TitleLink,
    TitleWithoutDescription,
    WithCustomColSizes,
} from './helpers';

test.describe('Title', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <TitleLink>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<TitleLink />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <CustomTitle>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<CustomTitle />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Sizes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Sizes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <SizesWithLinks>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<SizesWithLinks />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <TitleWithoutDescription>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<TitleWithoutDescription />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithCustomColSizes>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithCustomColSizes />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
