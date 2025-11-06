import {composeStories} from '@storybook/react';

import * as ToggleArrowStories from '../__stories__/ToggleArrow.stories';

export const {
    Default,
    Horizontal,
    Vertical,
    OpenHorizontal,
    OpenVertical,
    Thin,
    Slow,
    ThinSlow,
    NavigationIcon,
    AllVariants,
} = composeStories(ToggleArrowStories) as Record<string, React.FC<any>>;
