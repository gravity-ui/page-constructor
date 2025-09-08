import {composeStories} from '@storybook/react';

import * as PriceCardStories from '../__stories__/PriceCard.stories';

export const {Default, DifferentContent, Link, Themed} = composeStories(PriceCardStories);
