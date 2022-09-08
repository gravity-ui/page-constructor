import {BlogPostTag, SpeakerPublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import {Locale} from '../models/locale';

export interface BlogPostLikes {
    count: number;
    hasUserLike: boolean;
}

export interface BlogPagePostsData {
    posts: BlogPostData[];
    count: number;
    totalCount: number;
}

export interface BlogPageData {
    posts: BlogPagePostsData;
    tags: BlogPostTagExtended[];
}

export interface GetBlogPostsRequest {
    perPage: number;
    page: number;
    tags?: string;
    sortBy?: string;
    savedOnly?: boolean;
    search?: string;
}

export type BlogPostTagExtended = BlogPostTag & {
    name: string;
    slug: string;
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
    legacySharingImage?: string;
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
    tags: BlogPostTagExtended[];
    textTitle: string;
    title: string;
    url: string;
    noIndex?: boolean;
}

export enum BlockType {
    BlogHeaderBlock = 'blog-header-block',
    BlogYFMBlock = 'blog-yfm-block',
    BlogLayoutBlock = 'blog-layout-block',
    BlogMediaBlock = 'blog-media-block',
    BlogBannerBlock = 'blog-banner-block',
    BlogCTABlock = 'blog-cta-block',
    BlogColoredTextBlock = 'blog-colored-text-block',
    BlogAuthorBlock = 'blog-author-block',
    BlogSuggestBlock = 'blog-suggest-block',
    BlogMetaBlock = 'blog-meta-block',
}

export interface BlogMetaProps {
    title: string;
    date: string;
    image: string;
    canonicalUrl: string;
    content?: string;
    description?: string;
    legacySharingImage?: string;
    keywords?: string[];
    noIndex?: boolean;
    authors?: SpeakerPublic[];
    tags?: BlogPostTagExtended[];
    organization: {
        url: string;
        appTitle: string;
        legalName: string;
        supportEmail: string;
    };
}

export type ToggleLikeCallbackType = ({
    postId,
    hasLike,
}: {
    postId?: number;
    hasLike?: boolean;
}) => void;
