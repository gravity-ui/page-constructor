import {composeStories} from '@storybook/react';

import * as CompaniesStories from '../__stories__/Companies.stories';

export const {Default, WithDescription} = composeStories(CompaniesStories);
