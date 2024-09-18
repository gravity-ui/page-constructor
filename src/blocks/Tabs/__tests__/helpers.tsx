import {composeStories} from '@storybook/react';

import * as TabsStories from '../__stories__/Tabs.stories';

export const {
    Default,
    OnlyMedia,
    OnlyText,
    TabsButtonsColSizes,
    Centered,
    Direction,
    Caption,
    MediaBorder,
} = composeStories(TabsStories);
