import * as React from 'react';

import {Image} from '../../../components';
import {getMediaImage} from '../../../components/Media/Image/utils';
import RouterLink from '../../../components/RouterLink/RouterLink';
import {LocationContext} from '../../../context/locationContext';
import {useTheme} from '../../../context/theme';
import {ThemedNavigationLogoData} from '../../../models';
import {block, getLinkProps, getThemedValue} from '../../../utils';

import {i18n} from './i18n';

import './Logo.scss';

const b = block('logo');

export type LogoProps = ThemedNavigationLogoData & {
    className?: string;
    alt?: string;
};

export const Logo = ({alt = i18n('image-alt'), ...restProps}: LogoProps) => {
    const props: LogoProps = {...restProps, alt};
    const {hostname, Link} = React.useContext(LocationContext);
    const theme = useTheme();
    const themedLogoProps = getThemedValue(props, theme) || props;
    const imageData = getMediaImage(themedLogoProps.icon || props.icon);
    imageData.alt = alt;
    const textData = themedLogoProps.text || props.text;
    const url = themedLogoProps.url || props.url || '/';
    const urlTitle = themedLogoProps.urlTitle || props.urlTitle || textData;
    const linkExtraProps = getLinkProps(url, hostname);
    const content = (
        <React.Fragment>
            {imageData && <Image className={b('icon')} {...imageData} />}
            <span className={b('text')}>{textData}</span>
        </React.Fragment>
    );

    return (
        <RouterLink href={url} passHref>
            {Link ? (
                <span className={b(null, props.className)}>{content}</span>
            ) : (
                <a
                    className={b(null, props.className)}
                    href={url}
                    title={urlTitle}
                    {...linkExtraProps}
                >
                    {content}
                </a>
            )}
        </RouterLink>
    );
};

export default Logo;
