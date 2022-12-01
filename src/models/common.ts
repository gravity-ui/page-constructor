import {IDevice, IBrowser} from 'ua-parser-js';
import {ReactNode} from 'react';

import {SpeakerPublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import {
    HeaderBlockProps as PageConstructorHeaderBlockProps,
    PageContent,
} from '@gravity-ui/page-constructor';

import {Locale} from '../models/locale';

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

export type Query = Record<string, number | string | null>;

//page models

export interface Menu {
    title: string;
}

export interface BasePageData {
    name: string;
    title: string;
    metaDescription: string;
    keywords: string[];
    noIndex?: boolean;
    shareTitle?: string;
    shareDescription?: string;
    shareImage?: string;
    service?: unknown;
    solution?: unknown;
}

export interface PageData extends BasePageData {
    content: PageContent;
}

export interface WithDeviceProps {
    device: IDevice;
    browser: IBrowser;
    isRobot: boolean;
}

export interface BlogPostLikes {
    count: number;
    hasUserLike: boolean;
}

export interface BlogPagePostsData {
    posts: BlogPostData[];
    count: number;
    totalCount: number;
    pinnedPost?: BlogPostData;
}

export type BlogPostTag = {
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

export interface BlogPostData {
    author?: string;
    authors?: SpeakerPublic[];
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
    tags: BlogPostTag[];
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

export interface BlogPostMetaProps {
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
    authors?: SpeakerPublic[];
    tags?: BlogPostTag[];
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

export type GetBlogPostsRequest = {
    tags: string | undefined;
    page: number;
    perPage: number;
    savedOnly: boolean;
    search: string | undefined;
    services: string | undefined;
};

export type GetBlogPostsType = (query: GetBlogPostsRequest) => Promise<BlogPagePostsData>;

export type HandleChangeQueryParams = (params: Query) => void;

export type SetQueryType = (
    params: Query,
    options?: {
        [y: string]: boolean;
    },
) => Promise<void> | void;
