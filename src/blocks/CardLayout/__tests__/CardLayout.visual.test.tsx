import {test} from '../../../../playwright/core/index';

import {ChildrenCardOptions, ColSize, Default, WithBackground} from './helpers';

test.describe('CardLayout', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ChildrenCardOptions>', async ({
        mount,
        expectScreenshot,
        defaultDelay,
    }) => {
        await mount(<ChildrenCardOptions />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <ColSize>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<ColSize />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithBackground>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithBackground />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
