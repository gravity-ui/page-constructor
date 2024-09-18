import React from 'react';

import {test} from '../../../../playwright/core/index';

import {DataLens, Image, ImageSlider, Video, Youtube} from './helpers';

const DEFAULT_MEDIACARD_DELAY = 10 * 1000;

test.describe('MediaCard', () => {
    test('render stories <DataLens>', async ({mount, expectScreenshot, delay}) => {
        await mount(<DataLens />);
        await delay(DEFAULT_MEDIACARD_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <Image>', async ({mount, expectScreenshot, delay}) => {
        await mount(<Image />);
        await delay(DEFAULT_MEDIACARD_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ImageSlider>', async ({mount, expectScreenshot, delay}) => {
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
