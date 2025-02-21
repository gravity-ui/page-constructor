import * as React from 'react';
import {StoryFn, StoryContext} from '@storybook/react';
import {MobileProvider} from '@gravity-ui/uikit';

export function withMobile(Story: StoryFn, context: StoryContext) {
    const platform = context.globals.platform;

    return (
        <MobileProvider mobile={platform === 'mobile'} platform={platform}>
            <Story {...context} />
        </MobileProvider>
    );
}
