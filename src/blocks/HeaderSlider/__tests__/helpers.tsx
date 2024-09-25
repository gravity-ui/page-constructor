import {composeStories} from '@storybook/react';

import * as HeaderSliderStories from '../__stories__/HeaderSlider.stories';

export const {Default, AutoPlay} = composeStories(HeaderSliderStories);
