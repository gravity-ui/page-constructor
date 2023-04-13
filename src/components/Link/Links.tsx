import React, {Fragment} from 'react';

import {ClassNameProps, LinkProps} from '../../models';

import Link from './Link';

interface LinksProps extends ClassNameProps {
    links?: LinkProps[];
}

const Links = (props: LinksProps) => {
    const {links, className} = props;

    if (!links) {
        return null;
    }

    return (
        <Fragment>
            {links.map((link: LinkProps) => (
                <Link key={link.url} {...link} className={className} />
            ))}
        </Fragment>
    );
};

export default Links;
