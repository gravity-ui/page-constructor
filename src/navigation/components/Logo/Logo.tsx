import React, {Fragment, useContext} from 'react';

import {Image} from '../../../components';
import {getMediaImage} from '../../../components/Media/Image/utils';
import RouterLink from '../../../components/RouterLink/RouterLink';
import {LocationContext} from '../../../context/locationContext';
import {useTheme} from '../../../context/theme';
import {ThemedNavigationLogoData} from '../../../models';
import {block, getLinkProps, getThemedValue} from '../../../utils';

import './Logo.scss';

const b = block('logo');

export type LogoProps = ThemedNavigationLogoData & {
    className?: string;
};

const Logo: React.FC<LogoProps> = (props) => {
    const {hostname} = useContext(LocationContext);
    const theme = useTheme();
    const themedLogoProps = getThemedValue(props, theme) || props;
    const imageData = getMediaImage(themedLogoProps.icon || props.icon);
    const textData = themedLogoProps.text || props.text;
    const url = themedLogoProps.url || props.url || '/';
    const urlTitle = themedLogoProps.urlTitle || props.urlTitle || textData;
    const linkExtraProps = getLinkProps(url, hostname);
    const content = (
        <Fragment>
            {imageData && <Image className={b('icon')} {...imageData} />}
            <span className={b('text')}>{textData}</span>
        </Fragment>
    );

    return (
        <RouterLink href={url} passHref>
            <a className={b(null, props.className)} href={url} title={urlTitle} {...linkExtraProps}>
                {content}
            </a>
        </RouterLink>
    );
};

export default Logo;
