import {composeStories} from '@storybook/react';

import * as PriceDetailedStories from '../__stories__/PriceDetailed.stories';

export const {MarkedList, Settings, WithBlackText} = composeStories(PriceDetailedStories);
