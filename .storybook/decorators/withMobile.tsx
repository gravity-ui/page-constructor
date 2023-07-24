import React from 'react';
import {StoryFn, StoryContext} from '@storybook/react';
import {useMobile} from '@gravity-ui/uikit';

export function withMobile(Story: StoryFn, context: StoryContext) {
    const mobileValue = context.globals.platform === 'mobile';

    const [mobile, setMobile] = useMobile(); // eslint-disable-line react-hooks/rules-of-hooks

    if (mobile !== mobileValue) {
        setMobile(mobileValue);
    }

    return <Story {...context} />;
}
