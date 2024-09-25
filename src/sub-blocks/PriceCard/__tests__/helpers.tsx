import {composeStories} from '@storybook/react';

import * as PriceCardStories from '../__stories__/PriceCard.stories';

export const {Default, DifferentContent, Themed} = composeStories(PriceCardStories);
