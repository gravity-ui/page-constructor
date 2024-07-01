import React, {Fragment, useContext} from 'react';

import {LocationContext} from '../../context/locationContext';

export interface RouterLinkProps {
    href: string;
    [key: string]: unknown;
}

const RouterLink = ({href, children}: React.PropsWithChildren<RouterLinkProps>) => {
    const {Link} = useContext(LocationContext);

    return Link ? <Link href={href}>{children}</Link> : <Fragment>{children}</Fragment>;
};

export default RouterLink;
