import {Locale} from '../models/locale';
import {BlogMetaProps} from '../models/blog';

import {format} from './date';

type BreadcrumbsData = {
    title: string;
    slug: string;
};

interface GetBlogPostSchemaData
    extends Pick<
        BlogMetaProps,
        'title' | 'description' | 'date' | 'keywords' | 'image' | 'content' | 'organization'
    > {
    url: string;
    author: string;
    locale: Locale | undefined;
    breadcrumbs?: BreadcrumbsData[];
}

const countWords = (str: string) => str.split(' ').filter(Boolean).length;

/* #region schema org */

const getLanguageSchema = ({lang, langName}: Locale) => ({
    '@type': 'Language',
    name: langName,
    alternateName: lang,
});

const getSharedContentSchema = ({
    url,
    title,
    author,
}: {
    url: string;
    title: string;
    author: ReturnType<typeof getAuthorSchema>;
}) => ({
    '@type': 'WebPage',
    headline: title,
    url,
    author,
});

const getOrganizationSchema = ({appTitle, url}: {appTitle: string; url: string}) => {
    const ORGANIZATION_ICON_DIMENSIONS = 32;

    const iconUrl = url && new URL('/favicon.png', url);

    return {
        '@type': 'Organization',
        name: appTitle,
        url,
        logo: {
            '@type': 'ImageObject',
            url: iconUrl,
            width: ORGANIZATION_ICON_DIMENSIONS,
            height: ORGANIZATION_ICON_DIMENSIONS,
        },
    };
};

const getAuthorSchema = (author: string | undefined, organization: BlogMetaProps['organization']) =>
    author
        ? {
              '@type': 'Person',
              name: author,
          }
        : getOrganizationSchema(organization);

export const getBlogPostSchema = ({
    url,
    title,
    description,
    date,
    author: authorName,
    keywords,
    image,
    content,
    breadcrumbs,
    organization,
    locale,
}: GetBlogPostSchemaData) => {
    const authorSchema = getAuthorSchema(authorName, organization);
    const organizationSchema = getOrganizationSchema(organization);
    const languageSchema = getLanguageSchema(locale as Locale);
    const sharedContent = getSharedContentSchema({
        url,
        title,
        author: authorSchema,
    });

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
                '@id': url,
                url: url,
                name: title,
                headline: title,
                abstract: description,
                description,
                dateCreated: date,
                datePublished: date,
                dateModified: date,
                author: authorSchema,
                creator: authorSchema,
                publisher: organizationSchema,
                copyrightHolder: organizationSchema,
                copyrightYear: format(date || Number(new Date()), 'year'),
                mainEntityOfPage: true,
                inLanguage: languageSchema,
                keywords,
                image,
                sharedContent,
                wordCount: content && countWords(content),
                articleBody: content,
            },
        ],
    };
};

/* #endregion schema org */

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
