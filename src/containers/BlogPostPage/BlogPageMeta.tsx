import React, {useContext} from 'react';

import Meta, {MetaComponentProps} from '../../components/Meta/Meta';

import {RouterContext} from '../../contexts/RouterContext';
import {LocaleContext} from '../../contexts/LocaleContext';

import {i18, BlogKeyset} from '../../i18n';

import {getBlogPostSchema} from '../../utils/meta';

import {BlogPostMetaProps} from '../../models/blog';

/**
 * Create meta data for blog page
 *
 * @param title - post title
 * @param date - post create date
 * @param description - post description
 * @param image - post image
 * @param keywords - keywords fro meta
 * @param noIndex - flag that we need to don't indexing the page
 * @param authors - post authors
 * @param tags - post tags
 * @param content - post content like string
 * @param sharing - sharing data
 * @param organization - info about organization (YCloud, DoubleCloud)
 * @param canonicalUrl - post canonicalUrl
 * @returns
 */
export const BlogPageMeta: React.FC<BlogPostMetaProps> = React.memo(
    ({
        title,
        date,
        description = '',
        image,
        keywords,
        noIndex = false,
        authors = [],
        tags = [],
        content = '',
        organization,
        canonicalUrl,
        sharing,
    }) => {
        const {pathname} = useContext(RouterContext);
        const {locale} = useContext(LocaleContext);

        const {shareTitle, shareDescription, shareImage, shareGenImage, shareGenTitle} = sharing;

        const breadcrumbs = [
            {
                slug: '/blog',
                title: i18(BlogKeyset.TitleBlog),
            },
        ];

        if (tags?.length) {
            const tag = tags[0];
            breadcrumbs.push({
                slug: tag.slug,
                title: tag.name,
            });
        }

        const metaKeywords = keywords || tags?.map((tag) => tag.name);

        const authorNames = authors?.map((author) => author.fullName).join(', ');

        const schemaData = getBlogPostSchema({
            title,
            date,
            description,
            author: authorNames,
            image,
            url: pathname,
            keywords: metaKeywords,
            content,
            breadcrumbs,
            organization,
            locale,
        });

        const {name: shareTag} = tags?.[0] || {};

        const hasDesignedSharing = Boolean(shareImage);

        const generatedSharingProps = hasDesignedSharing
            ? []
            : [
                  {property: 'share:title', content: shareGenTitle || shareTitle || title},
                  {property: 'share:tag', content: shareTag},
                  {property: 'share:content_image', content: shareGenImage},
                  {property: 'share:sharing_schema', content: 'blog-share'},
              ];

        const meta: MetaComponentProps = {
            url: pathname,
            title,
            description,
            keywords,
            noIndex,
            canonicalUrl,
            image: shareImage || undefined,
            schemaJsonLd: schemaData,
            sharing: {
                title: shareTitle,
                description: shareDescription,
            },
            extra: [
                {property: 'article:published_time', content: date},
                {property: 'article:author', content: authorNames},
                ...generatedSharingProps,
            ].concat(tags?.map(({name}) => ({property: 'article:tag', content: name})) || []),
        };

        return <Meta {...meta} />;
    },
);
