import {composeStories} from '@storybook/react';

import * as BannerStories from '../__stories__/Banner.stories';

export const {Default, DarkTheme} = composeStories(BannerStories);
