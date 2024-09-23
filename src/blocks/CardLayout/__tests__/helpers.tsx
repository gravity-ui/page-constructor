import {composeStories} from '@storybook/react';

import * as CardLayoutStories from '../__stories__/CardLayout.stories';

export const {Default, ColSize, WithCustomIndents, WithBackground} =
    composeStories(CardLayoutStories);
