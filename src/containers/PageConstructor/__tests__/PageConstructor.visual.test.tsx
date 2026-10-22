import {test} from '../../../../playwright/core/index';

import {WithProjectVideoButtonSettings} from './helpers';

test.describe('PageConstructor', () => {
    test('render story <WithProjectVideoButtonSettings>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
        page,
    }) => {
        await mount(<WithProjectVideoButtonSettings />);
        await defaultDelay();

        await page.locator('video').evaluateAll((videos) => {
            videos.forEach((video) => {
                const videoElement = video as HTMLVideoElement;

                videoElement.pause();
                videoElement.currentTime = 0;
            });
        });
        await defaultDelay();

        await expectScreenshot({
            component: page.locator('.pc-page-constructor'),
        });
    });
});
