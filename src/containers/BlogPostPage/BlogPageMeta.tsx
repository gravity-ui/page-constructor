import _ from 'lodash';
import React from 'react';

import {SpeakerPublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import {PageContent} from '@yandex-data-ui/page-constructor';

import {i18, BlogKeysetWords} from 'src/i18n';

// TODO fixes in https://st.yandex-team.ru/ORION-1432

import Meta, {MetaComponentProps} from 'components/Meta/Meta';
// import {SchemaOrgUtils} from 'utils';
// import {getContent} from '../../../../../common/utils';
// import {LocaleContext} from 'contexts/LocaleContext';
// import {RouterContext} from 'contexts/RouterContext';
// import {RegionalConfigContext} from 'contexts/RegionalConfigContext';
import {BlogPostTagExtended} from 'models/blog';

export type BlogMetaProps = {
    title: string;
    textTitle: string;
    date: string;
    image: string;
    content?: PageContent;
    description?: string;
    shareTitle?: string;
    shareDescription?: string;
    shareImage?: string;
    legacySharingImage?: string;
    metaDescription?: string;
    keywords?: string[];
    noIndex?: boolean;
    authors?: SpeakerPublic[];
    tags?: BlogPostTagExtended[];
};

export const BlogPageMeta: React.FC<BlogMetaProps> = (props) => {
    // const locale = useContext(LocaleContext);
    // const router = useContext(RouterContext);
    // const regionalConfig = useContext(RegionalConfigContext);

    if (!props) {
        return null;
    }

    const {
        title = '',
        textTitle,
        metaDescription,
        date,
        // description,
        // image,
        keywords,
        noIndex,
        shareTitle,
        shareDescription,
        shareImage,
        authors,
        tags,
        // content,
        legacySharingImage,
    } = props;

    const breadcrumbs = [
        {
            slug: '/blog',
            title: i18(BlogKeysetWords.titleBlog),
        },
    ];

    if (tags?.length) {
        const tag = tags[0];
        breadcrumbs.push({
            slug: tag.slug,
            title: tag.name,
        });
    }

    // const metaKeywords = keywords || tags?.map((tag) => tag.name);

    const authorNames = authors?.map((author) => author.fullName).join(', ');

    // TODO move schemaOrg
    // const schemaOrgUtils = new SchemaOrgUtils(locale.locale, regionalConfig);

    // const schemaData = schemaOrgUtils.getBlogPostSchema({
    //     title,
    //     date,
    //     description,
    //     author: authorNames,
    //     image,
    //     url: router.pathname,
    //     keywords: metaKeywords,
    //     content: getContent(content),
    //     breadcrumbs,
    // });

    const {name: shareTag} = tags?.[0] || {};
    const hasLegacySharing = Boolean(legacySharingImage);
    const generatedSharingProps = hasLegacySharing
        ? []
        : [
              {property: 'share:title', content: shareTitle?.length ? shareTitle : textTitle},
              {property: 'share:tag', content: shareTag},
              {property: 'share:content_image', content: shareImage},
              {property: 'share:sharing_schema', content: 'blog-share'},
          ];

    const meta: MetaComponentProps = {
        title,
        description: metaDescription,
        keywords,
        noIndex,
        image: hasLegacySharing ? legacySharingImage : undefined,
        // schemaJsonLd: schemaData,
        sharing: {
            title: shareTitle?.length ? shareTitle : title,
            description: shareDescription,
        },
        extra: [
            {property: 'article:published_time', content: date},
            {property: 'article:author', content: authorNames},
            ...generatedSharingProps,
        ].concat(tags?.map(({name}) => ({property: 'article:tag', content: name})) || []),
    };

    return <Meta {...meta} />;
};
