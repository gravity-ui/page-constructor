import React, {useContext} from 'react';

import {LocaleContext} from '../../contexts/LocaleContext';

import {getBlogSchema} from '../../utils/meta';

import {BlogPageMetaProps} from '../../models/blog';

import Meta, {MetaComponentProps} from '../../components/Meta/Meta';

export const BlogPageMeta: React.FC<BlogPageMetaProps> = ({
    title,
    description = '',
    noIndex = false,
    organization,
    canonicalUrl,
    sharing,
    blogPostsData,
}) => {
    const {locale} = useContext(LocaleContext);

    const schemaData = getBlogSchema({
        url: canonicalUrl,
        title,
        description,
        blogPostsData,
        organization,
        locale,
    });

    const metaData: MetaComponentProps = {
        description,
        canonicalUrl,
        title,
        sharing,
        schemaJsonLd: schemaData,
        noIndex,
    };

    return <Meta {...metaData} />;
};
