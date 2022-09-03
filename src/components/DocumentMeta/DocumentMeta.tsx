import React, {useContext} from 'react';
import {Helmet} from 'react-helmet';

import {RouterContext} from '../../contexts/RouterContext';

import {isRootPage} from '../../utils/common';
import {getCleanTitle} from '../../utils/meta';

export interface DocumentMetaProps {
    // DO NOT PASS TYPOGRAPHER'S STRING
    title?: string;
    appTitle?: string;
}

/**
 * Component for create document meta
 *
 * @param title - page title
 * @param appTitle - app title
 *
 * @returns jsx
 */
export const DocumentMeta: React.FC<DocumentMetaProps> = ({title = '', appTitle = ''}) => {
    const {pathname} = useContext(RouterContext);

    const isRoot = isRootPage(pathname);

    return (
        <Helmet
            title={getCleanTitle(title)}
            defaultTitle={isRoot ? undefined : appTitle}
            titleTemplate={isRoot ? undefined : appTitle}
        />
    );
};
