import urlJoin from 'url-join';

import {sanitizeHtml} from '@yandex-data-ui/page-constructor/server';

import {PriceResponse} from 'models/calculator';
import {countWords, formatPrice} from './common';
import {Locale} from 'contexts/LocaleContext';
import {getYear} from '../../common/utils';
import {Product} from 'units/marketplace/models';
import {Currency} from 'models/billing';
import {BlogPostData} from 'units/blog/models';
import {LocaleUtils} from '../../common/i18n/locales';
import {setUrlTld} from 'utils/common';
import {RegionalConfig} from 'contexts/RegionalConfigContext';
import {RouterContextProps} from 'contexts/RouterContext';

type BreadcrumbsData = {
    title: string;
    slug: string;
};

type GetBlogPostSchemaData = Pick<
    BlogPostData,
    'title' | 'url' | 'description' | 'date' | 'author' | 'keywords' | 'image' | 'content'
> & {breadcrumbs?: BreadcrumbsData[]};

export interface BlogData {
    url: string;
    title: string;
    description: string;
    blogPostsData?: BlogPostData[];
}

export interface ProductData {
    url: string;
    product: Product;
    minimumPrices: PriceResponse[];
}

export class SchemaOrgUtils {
    locale: Locale;
    regionalConfig: RegionalConfig;
    isScale: Boolean;

    constructor(locale: Locale, regionalConfig: RegionalConfig, isScale = false) {
        this.locale = locale;
        this.regionalConfig = regionalConfig;
        this.isScale = isScale;
    }

    getOrganizationSchema() {
        const {hosts, appTitle} = this.regionalConfig;
        const host = hosts[this.isScale ? 'scale' : 'site'];
        const url = setUrlTld(host, this.locale.tld, true);
        const iconUrl = url && new URL('/favicon.png', url);
        const name = this.isScale ? `${appTitle} Scale` : appTitle;

        return {
            '@type': 'Organization',
            name,
            url,
            logo: {
                '@type': 'ImageObject',
                url: iconUrl,
                width: 32,
                height: 32,
            },
        };
    }

    getAuthorSchema(author?: string) {
        return author
            ? {
                  '@type': 'Person',
                  name: author,
              }
            : this.getOrganizationSchema();
    }

    getLanguageSchema() {
        const {lang, langName} = this.locale;
        return {
            '@type': 'Language',
            name: langName,
            alternateName: lang,
        };
    }

    getSharedContentSchema(url: string, title: string, author?: string) {
        return {
            '@type': 'WebPage',
            headline: title,
            url: sanitizeHtml(url),
            author: this.getAuthorSchema(author),
        };
    }

    getBlogPostSchema(data: GetBlogPostSchemaData) {
        const {
            url,
            title,
            description,
            date,
            author: authorName,
            keywords,
            image,
            content,
            breadcrumbs,
        } = data;

        const safeUrl = sanitizeHtml(url);
        const author = this.getAuthorSchema(authorName);
        const organization = this.getOrganizationSchema();
        const language = this.getLanguageSchema();
        const sharedContent = this.getSharedContentSchema(url, title, authorName);

        const breadcrumbItems =
            breadcrumbs?.map((breadcrumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@id': breadcrumb.slug,
                    name: breadcrumb.title,
                },
            })) || [];

        return {
            '@context': 'http://schema.org/',
            '@graph': [
                {
                    '@type': 'BreadcrumbList',
                    itemListElement: breadcrumbItems,
                },
                {
                    '@type': 'BlogPosting',
                    '@id': safeUrl,
                    url: safeUrl,
                    name: title,
                    headline: title,
                    abstract: description,
                    description,
                    dateCreated: date,
                    datePublished: date,
                    dateModified: date,
                    author,
                    creator: author,
                    publisher: organization,
                    copyrightHolder: organization,
                    copyrightYear: getYear(date || new Date()),
                    mainEntityOfPage: true,
                    inLanguage: language,
                    keywords,
                    image,
                    sharedContent,
                    wordCount: content && countWords(content),
                    articleBody: content,
                },
            ],
        };
    }

    getBlogSchema(data: BlogData) {
        const {url, title, description, blogPostsData} = data;

        const safeUrl = sanitizeHtml(url);
        const organization = this.getOrganizationSchema();

        return {
            '@context': 'http://schema.org/',
            '@type': 'Blog',
            '@id': safeUrl,
            name: title,
            url: safeUrl,
            description,
            publisher: organization,
            blogPosts: blogPostsData
                ? blogPostsData.map((postData) => this.getBlogPostSchema(postData))
                : [],
        };
    }

    getProductSchema(data: ProductData, localeUtils: LocaleUtils) {
        const {
            url,
            product: {
                marketingInfo: {name, shortDescription, logo},
                publisher: {
                    marketingInfo: {logo: publisherLogo, name: publisherName},
                },
            },
            minimumPrices,
        } = data;

        if (!minimumPrices) {
            return undefined;
        }

        const safeUrl = sanitizeHtml(url);

        const minimumPrice = minimumPrices.reduce((sum, {cost}) => sum + cost, 0);
        const price = formatPrice(minimumPrice, this.locale, localeUtils, {
            isInteger: this.locale.currency !== Currency.USD,
        });

        return {
            '@context': 'http://schema.org/',
            '@type': 'Product',
            '@id': safeUrl,
            name,
            url: safeUrl,
            description: shortDescription,
            image: logo,
            offers: {
                '@type': 'AggregateOffer',
                lowPrice: price,
                priceCurrency: this.locale.currency,
            },
            brand: {
                '@type': 'Organization',
                name: publisherName,
                logo: publisherLogo,
            },
        };
    }
}

export function getSharingImageURL(
    locale: Locale,
    router: RouterContextProps,
    localeUtils: LocaleUtils,
    withQuery = false,
    routePrefix?: string,
): string {
    const pagePath = urlJoin(
        '/image-generator',
        routePrefix ?? '',
        router.pathname,
        withQuery
            ? `?${new URLSearchParams(router.query as Record<string, string>).toString()}`
            : '',
    );
    const url = localeUtils.getAbsoluteLocaleUrl(locale, router.hostname, pagePath);
    const config = {
        url: `https://${router.hostname}/api/image-generator/generate`,
        params: {
            url,
            width: 1280,
            height: 640,
        },
    };
    return axiosWrapper.getUri(config);
}

export function getCleanTitle(title?: string) {
    if (!title || !title.includes('|')) {
        return title;
    }

    const [cleanTitle] = title.split('|');

    return cleanTitle?.trim();
}

export function getDefaultTitle(appTitle: string, sectionTitle?: string) {
    return sectionTitle ? `${appTitle} - ${getCleanTitle(sectionTitle)}` : appTitle;
}

export function getTitleTemplate(appTitle: string, sectionTitle?: string) {
    return `%s | ${getDefaultTitle(appTitle, sectionTitle)}`;
}
