import {composeStories} from '@storybook/react';

import * as MediaCardStories from '../__stories__/MediaCard.stories';

export const {Image, ImageSlider, Video, Youtube, DataLens} = composeStories(MediaCardStories);
