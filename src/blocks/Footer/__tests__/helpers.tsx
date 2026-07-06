import {composeStories} from '@storybook/react';

import * as FooterStories from '../__stories__/Footer.stories';

export const {
    ShowcaseData,
    FloorsCustomization,
    ColumnsLayout,
    LogoPlacement,
    LinksOverflowStrategy,
    LinksAlignment,
} = composeStories(FooterStories);
