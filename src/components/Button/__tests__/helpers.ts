import {composeStories} from '@storybook/react';

import * as ButtonStories from '../__stories__/Button.stories';

export const {Default, ThemesSizes, Width, Icons} = composeStories(ButtonStories);
