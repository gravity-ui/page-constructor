import * as React from 'react';

import {ContentSize, LinkProps} from '../../models';
import {block} from '../../utils';
import Link from '../Link/Link';

import './Links.scss';

const b = block('links');

function getLinkSize(size: ContentSize) {
    switch (size) {
        case 's':
            return 'm';
        case 'l':
        default:
            return 'l';
    }
}

type LinksProps = {
    className?: string;
    titleId?: string;
    links?: LinkProps[];
    size?: ContentSize;
    qa?: string;
    linkQa?: string;
};

const Links = ({
    className,
    titleId,
    links,
    size = 's',
    qa,
    linkQa,
}: React.PropsWithChildren<LinksProps>) =>
    links ? (
        <div className={b({size}, className)} data-qa={qa}>
            {links?.map((link) => (
                <Link
                    className={b('link')}
                    {...link}
                    textSize={getLinkSize(size)}
                    key={link.url}
                    qa={linkQa}
                    extraProps={{
                        'aria-describedby': link.urlTitle ? undefined : titleId,
                        ...link.extraProps,
                    }}
                />
            ))}
        </div>
    ) : null;

export default Links;
