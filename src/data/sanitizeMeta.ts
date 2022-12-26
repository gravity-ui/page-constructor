import {sanitizeHtml} from '@gravity-ui/page-constructor/server';

import {PostMetaProps} from '../models/common';

/**
 * Function for sanitized meta-data fields
 */
export const sanitizeMeta = (metaData: PostMetaProps) => {
    const {title, description, date, image, canonicalUrl, organization} = metaData;

    // this func for resolve type conflicts in reduce method
    const stringObjectKeys = <K extends string, V>(obj: Record<K, V>) => Object.keys(obj) as K[];

    const sanitizedOrganization = stringObjectKeys(organization).reduce((acc, current) => {
        acc[current] = sanitizeHtml(organization[current]);

        return acc;
    }, {} as PostMetaProps['organization']);

    return {
        ...metaData,
        title: sanitizeHtml(title),
        description: sanitizeHtml(description as string),
        date: sanitizeHtml(date),
        image: sanitizeHtml(image),
        canonicalUrl: sanitizeHtml(canonicalUrl),
        organization: sanitizedOrganization,
    };
};
