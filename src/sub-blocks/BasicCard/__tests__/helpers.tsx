import {composeStories} from '@storybook/react';

import * as BasicCardStories from '../__stories__/BasicCard.stories';
import * as CardColorsStories from '../__stories__/CardColors.stories';

export const {
    Default,
    WithIcon,
    WithBorder,
    WithUrl,
    WithContentList,
    ControlPosition,
    Sizes,
    GravityIcons,
    HoverEffects,
} = composeStories(BasicCardStories);

export const {DefaultTokens, Custom} = composeStories(CardColorsStories);
