import {ReactElement} from 'react';

import {
    ContentBlockProps,
    HeaderBlockProps,
    MediaProps as PCMediaProps,
    TextTheme,
} from '@gravity-ui/page-constructor';

import {PaddingsYFMProps} from './paddings';
import {ClassNameProps, PostData, BlockType} from './common';

// blocks props
export type AuthorProps = ClassNameProps & {
    authorId: number;
    image: string;
} & PaddingsYFMProps;

export type BannerProps = ContentBlockProps & {
    color?: string;
    image?: string;
    imageSize?: 's' | 'm';
} & PaddingsYFMProps;

export type ColoredTextProps = ContentBlockProps & {
    background?: {
        color?: string;
        image?: string;
        altText?: string;
    };
} & PaddingsYFMProps;

export type CTAProps = {
    items: Array<ContentBlockProps>;
    columnCount?: number;
} & PaddingsYFMProps;

export type HeaderProps = HeaderBlockProps & PaddingsYFMProps;

export type LayoutProps = {
    fullWidth?: boolean;
    mobileOrder?: string;
    children: ReactElement[];
} & PaddingsYFMProps;

export type MediaProps = ClassNameProps &
    PaddingsYFMProps &
    Partial<Pick<PCMediaProps, 'youtube' | 'previewImg' | 'image' | 'video' | 'dataLens'>> & {
        text?: string;
    };

export type MetaProps = {
    locale: string;
    theme?: TextTheme;
} & PaddingsYFMProps;

export type SuggestProps = ClassNameProps & {
    posts: PostData[];
} & PaddingsYFMProps;

export type YFMProps = {
    text: string;
} & PaddingsYFMProps;

export type FeedProps = {
    image: string;
};

// blocks models
export type AuthorBlockModel = {
    type: BlockType.Author;
} & AuthorProps;

export type BannerBlockModel = {
    type: BlockType.Banner;
} & BannerProps;

export type ColoredTextBlockModel = {
    type: BlockType.ColoredText;
} & ColoredTextProps;

export type CTABlockModel = {
    type: BlockType.CTA;
} & CTAProps;

export type HeaderBlockModel = {
    type: BlockType.Header;
} & HeaderProps;

export type LayoutBlockModel = {
    type: BlockType.Layout;
} & LayoutProps;

export type MediaBlockModel = {
    type: BlockType.Media;
} & MediaProps;

export type MetaBlockModel = {
    type: BlockType.Meta;
} & MetaProps;

export type SuggestBlockModel = {
    type: BlockType.Suggest;
} & SuggestProps;

export type YFMBlockModel = {
    type: BlockType.YFM;
} & YFMProps;

export type FeedBlockModel = {
    type: BlockType.Feed;
} & FeedProps;

export type BlockModel =
    | AuthorBlockModel
    | BannerBlockModel
    | ColoredTextBlockModel
    | CTABlockModel
    | HeaderBlockModel
    | LayoutBlockModel
    | MediaBlockModel
    | MetaBlockModel
    | SuggestBlockModel
    | YFMBlockModel
    | FeedBlockModel;

export type Block = BlockModel & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
};
