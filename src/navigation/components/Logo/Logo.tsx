import React, {useContext} from 'react';

import {block, getThemedValue} from '../../../utils';
import {NavigationLogoData} from '../../../models';
import RouterLink from '../../../components/RouterLink/RouterLink';
import {getMediaImage} from '../../../components/Media/Image/utils';
import {ThemeValueContext} from '../../../context/theme/ThemeValueContext';
import {Image} from '../../../components';

import './Logo.scss';

const b = block('logo');

export interface LogoProps extends NavigationLogoData {
    className?: string;
}

const Logo: React.FC<LogoProps> = (props) => {
    const {themeValue: theme} = useContext(ThemeValueContext);
    const themedLogoProps = getThemedValue(props, theme) || props;
    const imageData = getMediaImage(themedLogoProps.icon || props.icon);
    const textData = themedLogoProps.text || props.text;

    return (
        <RouterLink href={themedLogoProps.url || '/'} passHref>
            <div className={b(null, props.className)}>
                {imageData && <Image className={b('icon')} {...imageData} />}
                <span className={b('text')}>{textData}</span>
            </div>
        </RouterLink>
    );
};

export default Logo;
