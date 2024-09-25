import {composeStories} from '@storybook/react';

import * as DividerStories from '../__stories__/Divider.stories';

export const {Default, Sizes} = composeStories(DividerStories);
