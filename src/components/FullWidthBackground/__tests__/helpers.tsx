import {composeStories} from '@storybook/react';

import * as FullWidthBackgroundStories from '../__stories__/FullWidthBackground.stories';

const stories = composeStories(FullWidthBackgroundStories);

export const Default = () => (
    <div
        style={{
            width: '800px',
            height: '100px',
            position: 'relative',
        }}
    >
        <stories.Default />
    </div>
);

export const Rounded = () => (
    <div
        style={{
            width: '800px',
            height: '100px',
            position: 'relative',
        }}
    >
        <stories.Rounded />
    </div>
);
