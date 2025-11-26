import * as React from 'react';

export const BACKGROUND_STYLE_PROPS = [
    'background',
    'backgroundAttachment',
    'backgroundBlendMode',
    'backgroundClip',
    'backgroundColor',
    'backgroundImage',
    'backgroundOrigin',
    'backgroundPositionX',
    'backgroundPositionY',
    'backgroundRepeat',
    'backgroundSize',
    'backgroundPosition',
] as const;

export const hasBackgroundCSS = (style: React.CSSProperties) =>
    BACKGROUND_STYLE_PROPS.some((backgroundStyleProp) => backgroundStyleProp in style);
