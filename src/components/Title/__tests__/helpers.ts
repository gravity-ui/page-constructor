import {composeStories} from '@storybook/react';

import * as TitleStories from '../__stories__/Title.stories';

const composed = composeStories(TitleStories) as Record<string, React.ComponentType<any>>;

export const {
    CustomTitle,
    Default,
    Sizes,
    SizesWithLinks,
    TitleLink,
    TitleWithoutDescription,
    WithCustomColSizes,
} = composed;
