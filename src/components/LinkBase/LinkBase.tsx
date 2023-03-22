import React, {useContext} from 'react';
import {omit} from 'lodash';

import {LinkBaseProps, WithChildren} from '../../models';
import {LocationContext} from '../../context/locationContext';
import RouterLink from '../RouterLink/RouterLink';

const LinkBase = (props: WithChildren<LinkBaseProps>) => {
    const {href, children, ...linkProps} = props;
    const {Link} = useContext(LocationContext);

    if (Link && href && !linkProps?.target) {
        const extractedProps = omit(linkProps, ['rel', 'ref']);

        return (
            <RouterLink href={href}>
                <a {...extractedProps}>{children}</a>
            </RouterLink>
        );
    }

    return (
        <a href={href} {...linkProps}>
            {children}
        </a>
    );
};

export default LinkBase;
