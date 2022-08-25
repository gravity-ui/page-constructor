import React, {Fragment, useMemo, useContext} from 'react';

import {MetaProps, SocialSharingMeta} from '@yandex-data-ui/common';

import {DocumentMetaProps, DocumentMeta} from 'components/DocumentMeta/DocumentMeta';

import {LocaleContext} from 'contexts/LocaleContext';
import {RouterContext} from 'contexts/RouterContext';

interface SharingProps {
    title: string;
    description: string;
}

export interface MetaComponentProps extends DocumentMetaProps {
    type?: string;
    url?: string;
    appTitle?: string;
    image?: string;
    locale?: string;
    sharing: SharingProps;
    extra?: MetaProps[];
    description?: string | null;
    keywords?: string | string[] | null;
    noIndex?: boolean;
    schemaJsonLd?: unknown;
    canonicalUrl: string;
    sharingUrlProps?: {
        withQuery: boolean;
        routePrefix: string;
    };
}

export const Meta: React.FC<MetaComponentProps> = ({
    title,
    appTitle,
    type = 'website',
    url,
    canonicalUrl,
    sharing,
    image,
    extra = [],
    schemaJsonLd,
    description,
    keywords,
    noIndex,
}) => {
    const {locale} = useContext(LocaleContext);
    const router = useContext(RouterContext);

    const sharingTitle = useMemo(() => sharing.title, [sharing?.title]);

    const sharingDescription = useMemo(() => sharing.description, [sharing?.description]);

    const metaDescription = useMemo(() => (description ? description : undefined), [description]);

    const metaKeywords = useMemo(
        () => (Array.isArray(keywords) ? keywords.join(',') : keywords),
        [keywords],
    );

    const metaSchemaJsonLd = useMemo(
        () => (schemaJsonLd ? JSON.stringify(schemaJsonLd) : undefined),
        [schemaJsonLd],
    );

    const baseUrl = useMemo(
        () => new URL(router.as, `https://${router.hostname}`).href,
        [router.as, router.hostname],
    );

    const extraMeta = useMemo(() => {
        const extraProperties = Array.from(extra);

        if (!extraProperties.find((metaTag) => metaTag.property === 'share:title')) {
            extraProperties.push({property: 'share:title', content: sharingTitle});
        }

        if (!extraProperties.find((metaTag) => metaTag.property === 'share:sharing_schema')) {
            extraProperties.push({property: 'share:sharing_schema', content: 'default'});
        }
        return extraProperties;
    }, [extra, sharingTitle]);

    return (
        <Fragment>
            <DocumentMeta title={title} appTitle={appTitle} />
            <SocialSharingMeta
                type={type}
                url={url}
                locale={locale?.code}
                title={sharingTitle}
                description={sharingDescription}
                image={image}
                extra={extraMeta}
            >
                <base href={baseUrl} />
                {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
                {noIndex && <meta name="robots" content="noindex" />}
                {description && <meta name="description" content={metaDescription} />}
                {metaKeywords && <meta name="keywords" content={metaKeywords} />}
                {metaSchemaJsonLd && (
                    <script id="schema" type="application/ld+json">
                        {metaSchemaJsonLd}
                    </script>
                )}
            </SocialSharingMeta>
        </Fragment>
    );
};

export default Meta;
