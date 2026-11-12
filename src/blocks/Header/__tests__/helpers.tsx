import {composeStories} from '@storybook/react';

import * as HeaderStories from '../__stories__/Header.stories';

export const {
    Default,
    Size,
    Centered,
    Image,
    VerticalOffset,
    Background,
    FullWidthBackground,
    FullWidthMediaBackground,
    DarkTheme,
    Breadcrumbs,
    MediaViewFit,
} = composeStories(HeaderStories);
