import {test} from '../../../../playwright/core/index';

import {DataLens, Image, ImageSlider, Video, Youtube} from './helpers';

const DEFAULT_MEDIACARD_DELAY = 10 * 1000;

test.describe('MediaCard', () => {
    test('render stories <DataLens>', async ({mount, expectScreenshot, page}) => {
        await mount(<DataLens />);
        await expectScreenshot({
            skipTheme: 'dark',
            mask: [page.locator('.pc-media-component-data-lens__wrap')],
        });
    });

    test('render stories <Image>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Image />);
        await delay(DEFAULT_MEDIACARD_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <ImageSlider>', async ({mount, expectScreenshot, delay}) => {
        await mount(<ImageSlider />);
        await delay(DEFAULT_MEDIACARD_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <Video>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Video />);
        await delay(DEFAULT_MEDIACARD_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Youtube>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Youtube />);
        await delay(DEFAULT_MEDIACARD_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });
});
