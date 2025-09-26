import {test} from '../../../../playwright/core/index';

import {
    ContentVariables,
    DataLens,
    Default,
    Direction,
    Iframe,
    ImageSlider,
    Size,
    Video,
    WithBorder,
    WithoutShadow,
    WithoutShadowDeprecated,
} from './helpers';

const DEFAULT_MEDIA_DELAY = 10 * 1000;

test.describe('Media', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Default />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ImageSlider>', async ({mount, expectScreenshot, delay}) => {
        await mount(<ImageSlider />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <Video>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Video />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <DataLens>', async ({mount, expectScreenshot, page}) => {
        await mount(<DataLens />);
        await expectScreenshot({
            skipTheme: 'dark',
            mask: [page.locator('.pc-media-component-data-lens__wrap')],
        });
    });

    test('render stories <Size>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Size />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Direction>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Direction />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithoutShadowDeprecated>', async ({mount, expectScreenshot, delay}) => {
        await mount(<WithoutShadowDeprecated />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithoutShadow>', async ({mount, expectScreenshot, delay}) => {
        await mount(<WithoutShadow />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBorder>', async ({mount, expectScreenshot, delay}) => {
        await mount(<WithBorder />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    // skip this test, because it is unstable
    test.skip('render stories <Iframe>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Iframe />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ContentVariables>', async ({mount, expectScreenshot, delay}) => {
        await mount(<ContentVariables />);
        await delay(DEFAULT_MEDIA_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });
});
