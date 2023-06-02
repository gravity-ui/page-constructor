import React, {useContext} from 'react';

import {LocationContext} from '../../context/locationContext';
import {WithChildren} from '../../models';
import {EXTERNAL_LINK_PROPS, isLinkExternal} from '../../utils';

export interface RouterLinkProps {
    href: string;
    forceAnchor?: boolean;
    target?: string;
    rel?: string;
    className?: string;
    [key: string]: unknown;
}

const RouterLink = ({
    href,
    rel,
    children,
    target,
    forceAnchor = false,
    ...commonProps
}: WithChildren<RouterLinkProps>) => {
    const {Link, hostname} = useContext(LocationContext);

    const isExternal = isLinkExternal(href, hostname);
    const shouldAnchorTag =
        typeof href === 'string' &&
        (!Link || isExternal || forceAnchor || target === EXTERNAL_LINK_PROPS.target);
    const component = shouldAnchorTag ? 'a' : Link;

    if (!component) {
        return <div>{JSON.stringify({isExternal, shouldAnchorTag, component})}</div>;
    }

    const linkProps = {
        href,
        target,
        rel: target === EXTERNAL_LINK_PROPS.target && !rel ? EXTERNAL_LINK_PROPS.rel : rel,
    };

    return React.createElement(
        component,
        {
            href,
            ...(shouldAnchorTag ? linkProps : {}),
            ...commonProps,
        },
        children,
    );
};

export default RouterLink;
