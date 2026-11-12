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

        await expectScreenshot({
            component: page.locator('.pc-page-constructor'),
        });
    });
});
