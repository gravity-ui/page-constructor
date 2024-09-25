import type {MountOptions, MountResult} from '@playwright/experimental-ct-react';
import type {
    Locator,
    PageScreenshotOptions,
    PlaywrightTestArgs,
    PlaywrightTestOptions,
    PlaywrightWorkerArgs,
    PlaywrightWorkerOptions,
    TestFixture,
} from '@playwright/test';

interface ComponentFixtures {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mount<HooksConfig extends any>(
        component: JSX.Element,
        options?: MountOptions<HooksConfig>,
        style?: React.CSSProperties,
    ): Promise<MountResult>;
}

type PlaywrightTestFixtures = PlaywrightTestArgs & PlaywrightTestOptions & ComponentFixtures;
type PlaywrightWorkerFixtures = PlaywrightWorkerArgs & PlaywrightWorkerOptions;
type PlaywrightFixtures = PlaywrightTestFixtures & PlaywrightWorkerFixtures;
export type PlaywrightFixture<T> = TestFixture<T, PlaywrightFixtures>;

export type Fixtures = {
    mount: MountFixture;
    expectScreenshot: ExpectScreenshotFixture;
    defaultDelay: () => Promise<void>;
    delay: (delay: number) => Promise<void>;
};

export type MountFixture = ComponentFixtures['mount'];

export interface ExpectScreenshotFixture {
    (props?: CaptureScreenshotParams): Promise<void>;
}

interface CaptureScreenshotParams extends PageScreenshotOptions {
    screenshotName?: string;
    component?: Locator;
    skipTheme?: 'light' | 'dark';
}
