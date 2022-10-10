import React, {Fragment, useContext} from 'react';
import {LocationContext} from '../../context/locationContext';
import {WithChildren} from '../../models';

export interface RouterLinkProps {
    href: string;
}

const RouterLink = ({href, children}: WithChildren<RouterLinkProps>) => {
    const {Link} = useContext(LocationContext);

    return Link ? <Link href={href}>{children}</Link> : <Fragment>{children}</Fragment>;
};

export default RouterLink;
