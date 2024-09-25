import {composeStories} from '@storybook/react';

import * as InfoStories from '../__stories__/Info.stories';

export const {Default, WithContentList, LightTheme} = composeStories(InfoStories);
