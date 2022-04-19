import React, {Fragment, useContext} from 'react';
import {LocationContext} from '../../context/locationContext';

export interface RouterLinkProps {
    href: string;
}

const RouterLink: React.FunctionComponent<RouterLinkProps> = ({href, children}) => {
    const {Link} = useContext(LocationContext);

    return Link ? <Link href={href}>{children}</Link> : <Fragment>{children}</Fragment>;
};

export default RouterLink;
