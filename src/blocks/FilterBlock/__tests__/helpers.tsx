import {composeStories} from '@storybook/react';

import * as FilterBlockStories from '../__stories__/FilterBlock.stories';

export const {Default, WithDefaultAllTag, WithCustomAllTag} = composeStories(FilterBlockStories);
