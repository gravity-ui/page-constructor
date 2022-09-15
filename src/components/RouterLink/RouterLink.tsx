import React, {Fragment, useContext} from 'react';
import {LocationContext} from '../../context/locationContext';
import {ReactFCC} from '../../models';

export interface RouterLinkProps {
    href: string;
}

const RouterLink: ReactFCC<RouterLinkProps> = ({href, children}) => {
    const {Link} = useContext(LocationContext);

    return Link ? <Link href={href}>{children}</Link> : <Fragment>{children}</Fragment>;
};

export default RouterLink;
