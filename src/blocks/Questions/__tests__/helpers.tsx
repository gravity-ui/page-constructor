import {composeStories} from '@storybook/react';

import * as QuestionsStories from '../__stories__/Questions.stories';

export const {Default, TextWithListDash, TextWithListBullet, WithContentList} =
    composeStories(QuestionsStories);
