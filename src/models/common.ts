import {IDevice, IBrowser} from 'ua-parser-js';
import {ReactNode} from 'react';

import {HeaderBlockProps as PageConstructorHeaderBlockProps} from '@gravity-ui/page-constructor';

import {Locale} from '../models/locale';

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

export interface ClassNameProps {
    className?: string;
}

export type Author = {
    id: number;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
    firstName: string | null;
    secondName: string | null;
    description: string | null;
    fullDescription: string | null;
} & {
    [x: string]: string | null;
};

export type Service = {
    id: number;
    slug: string;
    name: string;
} & {
    [x: string]: string | null;
};

export type Query = Record<string, number | string | null>;

//page models

export interface Menu {
    title: string;
}

export interface WithDeviceProps {
    device: IDevice;
    browser: IBrowser;
    isRobot: boolean;
}

export interface PostsProps {
    posts: PostData[];
    count: number;
    totalCount: number;
    pinnedPost?: PostData;
}

export type Tag = {
    slug: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    icon?: string;
    isDeleted?: boolean;
    locale?: string;
    blogTagId?: number;
    count?: number;
};

export interface PostData {
    author?: string;
    authors?: Author[];
    blogPostId?: number;
    content?: string;
    date: string;
    description?: string;
    hasUserLike: boolean;
    htmlTitle: string;
    id: number;
    image: string;
    isPublished?: boolean;
    sharedImage?: string;
    likes: number;
    locale: Locale;
    metaDescription?: string | null;
    metaTitle?: string | null;
    readingTime?: number;
    shareDescription?: string;
    shareImage?: string;
    shareTitle?: string;
    slug: string;
    keywords?: string[];
    tags: Tag[];
    textTitle: string;
    title: string;
    url: string;
    noIndex?: boolean;
}

export enum BlockType {
    Header = 'blog-header-block',
    YFM = 'blog-yfm-block',
    Layout = 'blog-layout-block',
    Media = 'blog-media-block',
    Banner = 'blog-banner-block',
    CTA = 'blog-cta-block',
    ColoredText = 'blog-colored-text-block',
    Author = 'blog-author-block',
    Suggest = 'blog-suggest-block',
    Meta = 'blog-meta-block',
    Feed = 'blog-feed-block',
}

export type MetaProps = {
    metaComponent: JSX.Element;
    needHelmetWrapper: boolean;
};

export type MetaOrganizationType = {
    url: string;
    appTitle: string;
    legalName: string;
    supportEmail: string;
};

export interface PostMetaProps {
    title: string;
    date: string;
    image: string;
    canonicalUrl: string;
    content?: string;
    description?: string;
    sharing: {
        shareTitle: string;
        shareDescription: string;
        shareImage: string;
        shareGenImage: string;
        shareGenTitle: string;
    };
    keywords?: string[];
    noIndex?: boolean;
    authors?: Author[];
    tags?: Tag[];
    organization: MetaOrganizationType;
}

export type ToggleLikeCallbackType = ({
    postId,
    hasLike,
}: {
    postId?: number;
    hasLike?: boolean;
}) => void;

export interface HeaderBlockProps extends PageConstructorHeaderBlockProps {
    backLink?: {
        url: string;
        title: ReactNode;
    };
}

export type GetPostsRequest = {
    tags: string | undefined;
    page: number;
    perPage: number;
    savedOnly: boolean;
    search: string | undefined;
    services: string | undefined;
};

export type GetPostsType = (query: GetPostsRequest) => Promise<PostsProps>;

export type HandleChangeQueryParams = (params: Query) => void;

export type SetQueryType = (
    params: Query,
    options?: {
        [y: string]: boolean;
    },
) => Promise<void> | void;
