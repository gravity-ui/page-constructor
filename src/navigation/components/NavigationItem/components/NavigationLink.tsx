import React, {Fragment, useContext} from 'react';

import {NavigationItemProps} from '../NavigationItem';
import {Content} from './Content';
import {NavigationArrow} from '../../../../icons';
import {RouterLink} from '../../../../components';

import {block, getLinkProps} from '../../../../utils';
import {getMediaImage} from '../../../../components/Media/Image/utils';

import {NavigationLinkItem} from '../../../../models';

import {LocationContext} from '../../../../context/locationContext';

import '../NavigationItem.scss';

const b = block('navigation-item');

type NavigationLinkProps = NavigationItemProps & NavigationLinkItem;

export const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
    const {hostname, Link} = useContext(LocationContext);
    const {url, text, icon, arrow, target, ...rest} = props;
    const linkExtraProps = getLinkProps(url, hostname, target);
    const iconData = icon && getMediaImage(icon);
    const content = (
        <Fragment>
            <Content text={text} icon={iconData} />
            {arrow && <NavigationArrow className={b('arrow')} />}
        </Fragment>
    );

    if (linkExtraProps?.target || !Link) {
        return (
            <a href={url} title={text} {...rest} {...linkExtraProps}>
                {content}
            </a>
        );
    } else {
        return (
            <RouterLink href={url} passHref>
                <a {...rest}>{content}</a>
            </RouterLink>
        );
    }
};
