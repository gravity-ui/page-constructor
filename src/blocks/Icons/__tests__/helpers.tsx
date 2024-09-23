import {composeStories} from '@storybook/react';

import * as IconsStories from '../__stories__/Icons.stories';

export const {Default, Size, WithText, HeaderColSize} = composeStories(IconsStories);
