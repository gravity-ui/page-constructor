import {composeStories} from '@storybook/react';

import * as BasicCardStories from '../__stories__/BasicCard.stories';

export const {Default, WithIcon, WithBorder, WithUrl, WithContentList, ControlPosition, Sizes} =
    composeStories(BasicCardStories);
