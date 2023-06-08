import React, {Fragment, useContext} from 'react';

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

export const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
    const {hostname, Link} = useContext(LocationContext);
    const {url, text, icon, arrow, target, className, iconSize, ...rest} = props;
    const linkExtraProps = getLinkProps(url, hostname, target);
    const iconData = icon && getMediaImage(icon);

    const classes = b(null, className);
    const content = (
        <Fragment>
            <ContentWrapper text={text} icon={iconData} iconSize={iconSize} />
            {arrow && <NavigationArrow className={b('arrow')} />}
        </Fragment>
    );

    if (linkExtraProps?.target || !Link) {
        return (
            <a href={url} title={text} className={classes} {...rest} {...linkExtraProps}>
                {content}
            </a>
        );
    } else {
        return (
            <RouterLink href={url} passHref>
                <a {...rest} className={classes}>
                    {content}
                </a>
            </RouterLink>
        );
    }
};
