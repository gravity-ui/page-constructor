import {composeStories} from '@storybook/react';

import * as PromoFeaturesBlockStories from '../__stories__/PromoFeaturesBlock.stories';

export const {DefaultTheme, GreyTheme} = composeStories(PromoFeaturesBlockStories);
