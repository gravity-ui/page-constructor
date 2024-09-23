import {expect} from '@playwright/experimental-ct-react';
import type {JSHandle, Locator, PageScreenshotOptions} from '@playwright/test';
import {isFunction} from 'lodash';

import {DEFAULT_MOUNT_TEST_DELAY} from './constants';
import type {PlaywrightFixture} from './types';

interface CaptureScreenshotParams extends PageScreenshotOptions {
    screenshotName?: string;
    component?: Locator;
    waitingFunction?: JSHandle<boolean>;
    skipTheme?: 'light' | 'dark';
}

export interface ExpectScreenshotFixture {
    (props?: CaptureScreenshotParams): Promise<void>;
}

export const expectScreenshotFixture: PlaywrightFixture<ExpectScreenshotFixture> = async (
    {page},
    use,
    testInfo,
) => {
    const expectScreenshot: ExpectScreenshotFixture = async ({
        component,
        screenshotName,
        waitingFunction,
        skipTheme,
        ...pageScreenshotOptions
    } = {}) => {
        const captureScreenshot = async (waitingFunctionLocal?: JSHandle<boolean>) => {
            const locators = await page.locator('//img').all();
            const promises = locators.map((locator) =>
                locator.evaluate(
                    (image: HTMLImageElement) =>
                        image.complete ||
                        new Promise<unknown>((resolve) => image.addEventListener('load', resolve)),
                ),
            );
            await Promise.all(promises);

            if (waitingFunctionLocal && isFunction(waitingFunctionLocal)) {
                await waitingFunctionLocal();
            }

            return (component || page.locator('.playwright-wrapper-test')).screenshot({
                animations: 'disabled',
                ...pageScreenshotOptions,
            });
        };

        const nameScreenshot = testInfo.titlePath.slice(1).join(' ');

        if (skipTheme !== 'light') {
            expect(await captureScreenshot(waitingFunction)).toMatchSnapshot({
                name: `${screenshotName || nameScreenshot} light.png`,
            });
        }

        if (skipTheme !== 'dark') {
            await page.emulateMedia({colorScheme: 'dark'});

            await page.waitForTimeout(DEFAULT_MOUNT_TEST_DELAY);

            expect(await captureScreenshot(waitingFunction)).toMatchSnapshot({
                name: `${screenshotName || nameScreenshot} dark.png`,
            });
        }
    };

    await use(expectScreenshot);
};
