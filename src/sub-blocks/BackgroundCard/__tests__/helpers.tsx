import {composeStories} from '@storybook/react';

import * as BackgroundCardStories from '../__stories__/BackgroundCard.stories';

export const {
    Default,
    WithBackgroundImage,
    Paddings,
    CardThemes,
    BorderLine,
    BackgroundColor,
    WithUrl,
    ControlPosition,
} = composeStories(BackgroundCardStories);
