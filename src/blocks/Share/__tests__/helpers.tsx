import {composeStories} from '@storybook/react';

import * as ShareStories from '../__stories__/Share.stories';

export const {Default, CustomTitle} = composeStories(ShareStories);
