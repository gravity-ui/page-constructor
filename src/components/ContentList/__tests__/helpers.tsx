import {composeStories} from '@storybook/react';

import * as ContentListStories from '../__stories__/ContentList.stories';

export const {Default, WithoutText, WithoutTitle, WithoutIcon, Sizes, Themes} =
    composeStories(ContentListStories);
