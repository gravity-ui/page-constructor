import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';
import {useMobile} from '@gravity-ui/uikit';

export function withMobile(Story: StoryType, context: StoryContext) {
    const mobileValue = context.globals.platform === 'mobile';

    const [mobile, setMobile] = useMobile(); // eslint-disable-line react-hooks/rules-of-hooks

    if (mobile !== mobileValue) {
        setMobile(mobileValue);
    }

    return <Story {...context} />;
}
