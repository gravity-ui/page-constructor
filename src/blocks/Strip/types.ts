import * as React from 'react';

import {StripBlockProps as StripBlockParams} from '../../models';

export type StripBlockProps = React.PropsWithChildren<Omit<StripBlockParams, 'children'>>;

export type StripStyle = React.CSSProperties & {
    '--pc-strip-gap': string;
    '--pc-strip-half-gap': string;
    '--pc-strip-duration': string;
    '--pc-strip-viewport-width': string;
    '--pc-strip-item-height': string;
};

export type StripItemStyle = React.CSSProperties & {
    '--pc-strip-col-size-all': number;
    '--pc-strip-col-size-sm': number;
    '--pc-strip-col-size-md': number;
    '--pc-strip-col-size-lg': number;
    '--pc-strip-col-size-xl': number;
};

export type StripImageMaskStyle = React.CSSProperties & {
    '--pc-strip-image-mask-desktop': string;
    '--pc-strip-image-mask-tablet': string;
    '--pc-strip-image-mask-mobile': string;
};
