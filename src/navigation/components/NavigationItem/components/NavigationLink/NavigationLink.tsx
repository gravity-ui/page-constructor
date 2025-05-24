import * as React from 'react';

import {RouterLink} from '../../../../../components';
import {getMediaImage} from '../../../../../components/Media/Image/utils';
import {LocationContext} from '../../../../../context/locationContext';
import {NavigationArrow} from '../../../../../icons';
import {NavigationLinkItem} from '../../../../../models';
import {block, getLinkProps} from '../../../../../utils';
import {NavigationItemProps} from '../../../../models';
import {ContentWrapper} from '../ContentWrapper/ContentWrapper';

import './NavigationLink.scss';

const b = block('navigation-link');

type NavigationLinkProps = NavigationItemProps & NavigationLinkItem;

export const NavigationLink = (props: React.PropsWithChildren<NavigationLinkProps>) => {
    const {hostname, Link} = React.useContext(LocationContext);
    const {url, text, icon, arrow, target, className, iconSize, urlTitle, ...rest} = props;
    const linkExtraProps = getLinkProps(url, hostname, target);
    const iconData = icon && getMediaImage(icon);

    const classes = b(null, className);
    const content = (
        <React.Fragment>
            <ContentWrapper text={text} icon={iconData} iconSize={iconSize} />
            {arrow && <NavigationArrow className={b('arrow')} />}
        </React.Fragment>
    );

    if (linkExtraProps?.target || !Link) {
        return (
            <a
                href={url}
                title={urlTitle || text}
                className={classes}
                {...rest}
                {...linkExtraProps}
            >
                {content}
            </a>
        );
    } else {
        return (
            <RouterLink href={url} passHref>
                <a title={urlTitle || text} {...rest} className={classes}>
                    {content}
                </a>
            </RouterLink>
        );
    }
};
