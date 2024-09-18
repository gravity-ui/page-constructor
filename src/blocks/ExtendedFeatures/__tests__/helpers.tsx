import {composeStories} from '@storybook/react';

import * as ExtendedFeaturesStories from '../__stories__/ExtendedFeatures.stories';

export const {Default, WithLabel, ColSizes} = composeStories(ExtendedFeaturesStories);
