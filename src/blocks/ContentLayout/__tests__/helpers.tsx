import {composeStories} from '@storybook/react';

import * as ContentLayoutStories from '../__stories__/ContentLayout.stories';

export const {
    Default,
    WithFiles,
    Size,
    WithBackgroundColor,
    WithBackgroundImageAndColor,
    TextAlignCenter,
    Theme,
    TextWidth,
} = composeStories(ContentLayoutStories);
