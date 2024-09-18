import {composeStories} from '@storybook/react';

import * as QuoteStories from '../__stories__/Quote.stories';

export const {Default, QuoteTypes, BorderLine, DarkTheme} = composeStories(QuoteStories);
