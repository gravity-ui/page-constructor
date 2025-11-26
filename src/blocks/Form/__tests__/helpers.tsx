import {composeStories} from '@storybook/react';

import * as FormStories from '../__stories__/Form.stories';

export const {
    Default,
    ContentDirection,
    WithBackgroundColor,
    WithBackgroundImage,
    DarkTheme,
    FormData,
    WithCustomFormNode,
} = composeStories(FormStories);
