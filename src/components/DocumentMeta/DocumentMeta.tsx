import React, {useContext} from 'react';
import {Helmet} from 'react-helmet';

import {sanitizeHtml} from '@yandex-data-ui/page-constructor/server';

import {RouterContext} from 'contexts/RouterContext';
import {RegionalConfigContext} from 'contexts/RegionalConfigContext';

import {isRootPage} from 'utils/common';
import {getCleanTitle, getDefaultTitle, getTitleTemplate} from 'utils/meta';

export interface DocumentMetaProps {
    // DO NOT PASS TYPOGRAPHER'S STRING
    title?: string;
    sectionTitle?: string;
}

export const DocumentMeta: React.FC<DocumentMetaProps> = (props) => {
    const title = sanitizeHtml(props.title);
    const sectionTitle = sanitizeHtml(props.sectionTitle);
    const {appTitle} = useContext(RegionalConfigContext);
    const {pathname} = useContext(RouterContext);

    const isRoot = isRootPage(pathname);

    return (
        <Helmet
            title={getCleanTitle(title)}
            defaultTitle={isRoot ? undefined : getDefaultTitle(appTitle, sectionTitle)}
            titleTemplate={isRoot ? undefined : getTitleTemplate(appTitle, sectionTitle)}
        />
    );
};
