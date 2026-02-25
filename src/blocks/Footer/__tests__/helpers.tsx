import {composeStories} from '@storybook/react';

import * as FooterStories from '../__stories__/Footer.stories';

export const {Full, Default, WithBackground, ColumnsOnly, AllVariants} = composeStories(FooterStories);
