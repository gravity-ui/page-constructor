import {composeStories} from '@storybook/react';

import * as LayoutItemStories from '../__stories__/LayoutItem.stories';

export const {
    Default,
    WithContentList,
    Fullscreen,
    MetaInfo,
    Youtube,
    WithIcon,
    ControlPosition,
    Sizes,
} = composeStories(LayoutItemStories);
