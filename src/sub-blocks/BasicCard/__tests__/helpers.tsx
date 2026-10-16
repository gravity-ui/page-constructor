import {composeStories} from '@storybook/react';

import * as BasicCardStories from '../__stories__/BasicCard.stories';

export const {
    ColorTokens,
    NestedColorFallbacks,
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

export {default as BasicCard} from '../BasicCard';

export {default as CardLayout} from '../../../blocks/CardLayout/CardLayout';
export {default as MediaCard} from '../../MediaCard/MediaCard';
export {default as PriceDetailed} from '../../PriceDetailed/PriceDetailed';
