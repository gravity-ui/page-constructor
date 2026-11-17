import {test} from '../../../../playwright/core/index';
import {BREAKPOINTS} from '../../../constants';

import {Default} from './helpers';

test.describe('Strip', () => {
    test.use({viewport: {width: 1280, height: 900}});

    test.beforeEach(async ({page}) => {
        await page.emulateMedia({reducedMotion: 'no-preference'});
    });

    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(
            <div style={{width: 'calc(100vw - 40px)'}}>
                <Default />
            </div>,
        );
        await defaultDelay();
        await expectScreenshot();
    });

    test(`render marquee at ${BREAKPOINTS.md}px`, async ({
        page,
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await page.setViewportSize({width: BREAKPOINTS.md, height: 900});
        await mount(
            <div style={{width: 'calc(100vw - 40px)'}}>
                <Default />
            </div>,
        );
        await defaultDelay();
        await expectScreenshot();
    });
});
