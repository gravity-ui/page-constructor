import * as React from 'react';

import {LocationContext} from '../../context/locationContext';

export interface RouterLinkProps {
    href: string;
    [key: string]: unknown;
}

const RouterLink = ({href, children}: React.PropsWithChildren<RouterLinkProps>) => {
    const {Link} = React.useContext(LocationContext);

    return Link ? <Link href={href}>{children}</Link> : <React.Fragment>{children}</React.Fragment>;
};

export default RouterLink;
