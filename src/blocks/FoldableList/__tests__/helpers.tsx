import {composeStories} from '@storybook/react';

import * as FoldableListStories from '../__stories__/FoldableList.stories';

export const {Default, TextWithListDash, TextWithListBullet, WithContentList} =
    composeStories(FoldableListStories);
