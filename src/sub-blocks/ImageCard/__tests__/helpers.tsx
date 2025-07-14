import {composeStories} from '@storybook/react';

import * as ImageCardStories from '../__stories__/ImageCard.stories';

export const {
    Default,
    Margins,
    DirectionReverse,
    Content,
    BackgroundColor,
    WithUrl,
    Border,
    BorderRadius,
    ControlPosition,
    Size,
} = composeStories(ImageCardStories);
