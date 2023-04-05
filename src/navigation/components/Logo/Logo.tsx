import React, {useContext} from 'react';

import {Image} from '../../../components';
import {getMediaImage} from '../../../components/Media/Image/utils';
import RouterLink from '../../../components/RouterLink/RouterLink';
import {ThemeValueContext} from '../../../context/theme/ThemeValueContext';
import {ThemedNavigationLogoData} from '../../../models';
import {block, getThemedValue} from '../../../utils';

import './Logo.scss';

const b = block('logo');

export type LogoProps = ThemedNavigationLogoData & {
    className?: string;
};

const Logo: React.FC<LogoProps> = (props) => {
    const {themeValue: theme} = useContext(ThemeValueContext);
    const themedLogoProps = getThemedValue(props, theme) || props;
    const imageData = getMediaImage(themedLogoProps.icon || props.icon);
    const textData = themedLogoProps.text || props.text;

    return (
        <RouterLink href={themedLogoProps.url || props.url || '/'} passHref>
            <div className={b(null, props.className)}>
                {imageData && <Image className={b('icon')} {...imageData} />}
                <span className={b('text')}>{textData}</span>
            </div>
        </RouterLink>
    );
};

export default Logo;
