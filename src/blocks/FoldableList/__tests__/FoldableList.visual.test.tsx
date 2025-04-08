import {test} from '../../../../playwright/core/index';

import {Default, TextWithListBullet, TextWithListDash, WithContentList} from './helpers';

test.describe('FoldableList', () => {
    test('render stories <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <WithContentList>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<WithContentList />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <TextWithListDash>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<TextWithListDash />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render stories <TextWithListBullet>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<TextWithListBullet />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
