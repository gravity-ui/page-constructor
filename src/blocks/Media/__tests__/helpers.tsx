import {composeStories} from '@storybook/react';

import * as MediaStories from '../__stories__/Media.stories';

export const {
    Default,
    ImageSlider,
    Video,
    DataLens,
    Size,
    Direction,
    WithoutShadowDeprecated,
    WithoutShadow,
    WithBorder,
    Iframe,
    ContentVariables,
} = composeStories(MediaStories);
