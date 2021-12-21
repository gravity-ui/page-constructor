import React, {Fragment} from 'react';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {LinkProps} from '../../models';
import Link from './Link';

interface LinksProps extends ClassNameProps {
    links?: LinkProps[];
}

const Links: React.FunctionComponent<LinksProps> = (props) => {
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
