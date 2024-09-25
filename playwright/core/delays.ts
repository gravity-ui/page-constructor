import {DEFAULT_MOUNT_TEST_DELAY} from './constants';
import type {PlaywrightFixture} from './types';

export const defaultDelayFixture: PlaywrightFixture<() => Promise<void>> = async ({page}, use) => {
    const defaultDelay = async () => await page.waitForTimeout(DEFAULT_MOUNT_TEST_DELAY);
    await use(defaultDelay);
};

export const delayFixture: PlaywrightFixture<(delay: number) => Promise<void>> = async (
    {page},
    use,
) => {
    const delayFunction = async (delay: number) => await page.waitForTimeout(delay);
    await use(delayFunction);
};
