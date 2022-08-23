import React, {useContext} from 'react';
import {Helmet} from 'react-helmet';

import {sanitizeHtml} from '@yandex-data-ui/page-constructor/server';

import {RouterContext} from 'contexts/RouterContext';

import {isRootPage} from 'utils/common';
import {getCleanTitle, getDefaultTitle, getTitleTemplate} from 'utils/meta';

export interface DocumentMetaProps {
    // DO NOT PASS TYPOGRAPHER'S STRING
    title?: string;
    sectionTitle?: string;
    appTitle?: string;
}

/**
 * Component for create document meta
 *
 * @param title - page title
 * @param sectionTitle - section title
 * @param appTitle - app title
 *
 * @returns jsx
 */
export const DocumentMeta: React.FC<DocumentMetaProps> = ({
    title = '',
    sectionTitle = '',
    appTitle = '',
}) => {
    const sanitizedTitle = sanitizeHtml(title);
    const sanitizedSectionTitle = sanitizeHtml(sectionTitle);
    const {pathname} = useContext(RouterContext);

    const isRoot = isRootPage(pathname);

    return (
        <Helmet
            title={getCleanTitle(sanitizedTitle)}
            defaultTitle={isRoot ? undefined : getDefaultTitle(appTitle, sanitizedSectionTitle)}
            titleTemplate={isRoot ? undefined : getTitleTemplate(appTitle, sanitizedSectionTitle)}
        />
    );
};
