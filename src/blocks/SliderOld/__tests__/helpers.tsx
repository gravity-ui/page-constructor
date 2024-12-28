import {composeStories} from '@storybook/react';

import * as SliderStories from '../__stories__/Slider.stories';

export const {Default, QuoteCards, Banners, AutoPlay, WithoutArrows, WithoutDots, SlidesToShow} =
    composeStories(SliderStories);
