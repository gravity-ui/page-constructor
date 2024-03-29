import {test as base} from '@playwright/experimental-ct-react';

import {defaultDelayFixture} from './defaultDelay';
import {expectScreenshotFixture} from './expectScreenshotFixture';
import {mountFixture} from './mountFixture';
import type {Fixtures} from './types';

export const test = base.extend<Fixtures>({
    mount: mountFixture,
    expectScreenshot: expectScreenshotFixture,
    defaultDelay: defaultDelayFixture,
});
