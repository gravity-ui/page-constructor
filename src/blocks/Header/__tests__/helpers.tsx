import {composeStories} from '@storybook/react';

import * as HeaderStories from '../__stories__/Header.stories';

export const {
    Default,
    Size,
    Image,
    VerticalOffset,
    Background,
    FullWithBackground,
    FullWidthMediaBackground,
    DarkTheme,
    Breadcrumbs,
    MediaViewFit,
} = composeStories(HeaderStories);
