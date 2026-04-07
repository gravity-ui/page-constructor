import {composeStories} from '@storybook/react';

import * as HeroStories from '../__stories__/Hero.stories';

export const {Default, Breadcrumbs, Background, VerticalOffset, Image, Full} =
    composeStories(HeroStories);
