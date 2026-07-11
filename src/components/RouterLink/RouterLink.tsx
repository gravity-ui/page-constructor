import * as React from 'react';

import {useLocation} from '../../context/locationContext';

export interface RouterLinkProps {
    href: string;
    [key: string]: unknown;
}

const RouterLink = ({href, children}: React.PropsWithChildren<RouterLinkProps>) => {
    const {Link} = useLocation();

    return Link ? <Link href={href}>{children}</Link> : <React.Fragment>{children}</React.Fragment>;
};

export default RouterLink;
