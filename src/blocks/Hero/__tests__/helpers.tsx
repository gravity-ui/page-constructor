import {composeStories} from '@storybook/react';

import * as HeroStories from '../__stories__/Hero.stories';

export const {
    Default,
    Breadcrumbs,
    ContentList,
    Background,
    RoundCorners,
    VerticalOffset,
    Theme,
    MediaFit,
} = composeStories(HeroStories);
