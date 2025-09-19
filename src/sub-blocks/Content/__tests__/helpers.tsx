import {composeStories} from '@storybook/react';

import * as ContentStories from '../__stories__/Content.stories';

export const {Default, Size, Centered, Theme, ContentVariables} = composeStories(ContentStories);
