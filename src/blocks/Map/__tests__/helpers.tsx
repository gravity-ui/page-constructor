import {composeStories} from '@storybook/react';

import * as MapStories from '../__stories__/Map.stories';

export const {Default, Size, Direction, MapsTypes} = composeStories(MapStories);
