import {composeStories} from '@storybook/react';

import * as MapStories from '../__stories__/Map.stories';

export const {Default, WithControls, Size, Direction, MapsTypes} = composeStories(MapStories);
