import {test as base} from '@playwright/experimental-ct-react';

import {defaultDelayFixture, delayFixture} from './delays';
import {expectScreenshotFixture} from './expectScreenshotFixture';
import {mountFixture} from './mountFixture';
import type {Fixtures} from './types';

export const test = base.extend<Fixtures>({
    mount: mountFixture,
    expectScreenshot: expectScreenshotFixture,
    defaultDelay: defaultDelayFixture,
    delay: delayFixture,
});

export {expect} from '@playwright/experimental-ct-react';
