import {test} from '../../../../playwright/core/index';

import {
    ContentDirection,
    DarkTheme,
    Default,
    FormData,
    WithBackgroundColor,
    WithBackgroundImage,
    WithStub,
} from './helpers';

const DEFAULT_FORM_DELAY = 20 * 1000;

test.describe('Form', () => {
    test.skip('render stories <Default>', async ({mount, expectScreenshot, delay, page}) => {
        await mount(<Default />);
        await page.setViewportSize({height: 1018, width: 1264});
        await delay(DEFAULT_FORM_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <ContentDirection>', async ({mount, expectScreenshot, delay}) => {
        await mount(<ContentDirection />);
        await delay(DEFAULT_FORM_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <WithBackgroundColor>', async ({mount, expectScreenshot, delay}) => {
        await mount(<WithBackgroundColor />);
        await delay(DEFAULT_FORM_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <WithBackgroundImage>', async ({mount, expectScreenshot, delay}) => {
        await mount(<WithBackgroundImage />);
        await delay(DEFAULT_FORM_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <DarkTheme>', async ({mount, expectScreenshot, delay}) => {
        await mount(<DarkTheme />);
        await delay(DEFAULT_FORM_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <FormData>', async ({mount, expectScreenshot, delay}) => {
        await mount(<FormData />);
        await delay(DEFAULT_FORM_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });

    test.skip('render stories <WithStub>', async ({mount, expectScreenshot, delay}) => {
        await mount(<WithStub />);
        await delay(DEFAULT_FORM_DELAY);
        await expectScreenshot({skipTheme: 'dark'});
    });
});
