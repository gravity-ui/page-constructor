import React from 'react';
// import urlJoin from 'url-join';

import {MetaProps} from '@yandex-data-ui/common';

// import {getSharingImageURL} from 'utils/meta';
// import {sanitizeHtml} from 'utils/sanitize';
import {DocumentMetaProps} from 'components/DocumentMeta/DocumentMeta';
// import {LocaleContext} from 'contexts/LocaleContext';
// import {RouterContext} from 'contexts/RouterContext';
// import {useAppSettings} from 'hooks/useAppSettings';
// import FeatureFlagsContext from 'contexts/FeatureFlagsContext';
// import {RegionalConfigContext} from 'contexts/RegionalConfigContext';

// import {STATIC_PATHS} from '../../constants';

interface SharingProps {
    title?: string;
    description?: string;
}

export interface MetaComponentProps extends DocumentMetaProps {
    type?: string;
    url?: string;
    image?: string;
    locale?: string;
    sharing?: SharingProps;
    extra?: MetaProps[];
    description?: string | null;
    keywords?: string | string[] | null;
    noIndex?: boolean;
    schemaJsonLd?: unknown;
    canonical?: string;
    sharingUrlProps?: {
        withQuery: boolean;
        routePrefix: string;
    };
}

// TODO refactor in https://st.yandex-team.ru/ORION-1432
export const Meta: React.FC<MetaComponentProps> = (props) => {
    console.log(' ---------------------------------------');
    console.log('file: Meta.tsx ~ line 42 ~ props', props);
    console.log(' ---------------------------------------');
    return null;

    // const {
    //     type = 'website',
    //     url,
    //     // sharing,
    //     image,
    //     extra = [],
    //     schemaJsonLd,
    //     description,
    //     keywords,
    //     noIndex,
    //     canonical,
    //     sharingUrlProps,
    //     ...documentMetaProps
    // } = props;

    // const {imageGenerator} = useContext(FeatureFlagsContext);

    // const {styles} = useContext(RegionalConfigContext);
    // const {locale, localeUtils} = useContext(LocaleContext);
    // const router = useContext(RouterContext);
    // const {sharing: commonSharing} = useAppSettings();
    // const defaultShareSrc = styles.assetPath
    //     ? urlJoin(styles.assetPath, STATIC_PATHS.SHARE)
    //     : undefined;

    // const sharingTitle = useMemo(
    //     () => sanitizeHtml(sharing?.title) ?? commonSharing?.title,
    //     [commonSharing?.title, sharing?.title],
    // );

    // const sharingDescription = useMemo(
    //     () => sanitizeHtml(sharing?.description) ?? commonSharing?.description,
    //     [commonSharing?.description, sharing?.description],
    // );

    // const metaDescription = useMemo(
    //     () => (description ? sanitizeHtml(description) : undefined),
    //     [description],
    // );

    // const metaKeywords = useMemo(
    //     () => (Array.isArray(keywords) ? keywords.join(',') : keywords),
    //     [keywords],
    // );

    // const metaSchemaJsonLd = useMemo(
    //     () => (schemaJsonLd ? JSON.stringify(schemaJsonLd) : undefined),
    //     [schemaJsonLd],
    // );

    // const baseUrl = useMemo(
    //     () => new URL(router.as, `https://${router.hostname}`).href,
    //     [router.as, router.hostname],
    // );

    // const metaImage = useMemo(
    //     () =>
    //         image ||
    //         (imageGenerator
    //             ? getSharingImageURL(
    //                   locale,
    //                   router,
    //                   localeUtils,
    //                   sharingUrlProps?.withQuery,
    //                   sharingUrlProps?.routePrefix,
    //               )
    //             : defaultShareSrc),
    //     [
    //         defaultShareSrc,
    //         image,
    //         sharingUrlProps?.routePrefix,
    //         sharingUrlProps?.withQuery,
    //         imageGenerator,
    //         locale,
    //         localeUtils,
    //         router,
    //     ],
    // );

    // const defaultLangLocale = useMemo(
    //     () => localeUtils.getLocaleByLang(locale.lang),
    //     [locale.lang, localeUtils],
    // );

    // const canonicalUrl = useMemo(
    //     () =>
    //         locale.tld === defaultLangLocale.tld
    //             ? localeUtils.getAbsoluteLocaleUrl(
    //                   defaultLangLocale,
    //                   router.hostname,
    //                   canonical ?? baseUrl,
    //               )
    //             : null,
    //     [baseUrl, canonical, defaultLangLocale, locale.tld, localeUtils, router.hostname],
    // );

    // const extraMeta = useMemo(() => {
    //     const extraProperties = Array.from(extra);

    //     if (!extraProperties.find((metaTag) => metaTag.property === 'share:title')) {
    //         extraProperties.push({property: 'share:title', content: sharingTitle});
    //     }

    //     if (!extraProperties.find((metaTag) => metaTag.property === 'share:sharing_schema')) {
    //         extraProperties.push({property: 'share:sharing_schema', content: 'default'});
    //     }
    //     return extraProperties;
    // }, [extra, sharingTitle]);

    // return (
    //     <React.Fragment>
    //         <DocumentMeta {...documentMetaProps} />
    //         <SocialSharingMeta
    //             type={type}
    //             url={url || router.pathname}
    //             locale={locale?.code}
    //             title={sharingTitle}
    //             description={sharingDescription}
    //             image={metaImage}
    //             extra={extraMeta}
    //         >
    //             <base href={baseUrl} />
    //             {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    //             {noIndex && <meta name="robots" content="noindex" />}
    //             {description && <meta name="description" content={metaDescription} />}
    //             {metaKeywords && <meta name="keywords" content={metaKeywords} />}
    //             {metaSchemaJsonLd && (
    //                 <script id="schema" type="application/ld+json">
    //                     {metaSchemaJsonLd}
    //                 </script>
    //             )}
    //         </SocialSharingMeta>
    //     </React.Fragment>
    // );
};

export default Meta;
