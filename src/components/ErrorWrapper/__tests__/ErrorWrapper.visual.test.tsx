import {composeStories} from '@storybook/react';

import {test} from '../../../../playwright/core/index';
import * as ErrorWrapperStories from '../__stories__/ErrorWrapper.stories';

export const {Default, NoError, CustomClass, NoHandler, Interactive} =
    composeStories(ErrorWrapperStories);

test.describe('ErrorWrapper', () => {
    test('render <Default>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Default />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <NoError>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<NoError />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <CustomClass>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<CustomClass />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <NoHandler>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<NoHandler />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });

    test('render <Interactive>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<Interactive />);
        await defaultDelay();
        await expectScreenshot({skipTheme: 'dark'});
    });
});
