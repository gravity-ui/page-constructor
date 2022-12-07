import React from 'react';

import {block} from '../../../utils';
import {NavigationLogoData} from '../../../models';
import RouterLink from '../../../components/RouterLink/RouterLink';
import {getMediaImage} from '../../../components/Media/Image/utils';
import {Image} from '../../../components';

import './Logo.scss';

const b = block('logo');

export interface LogoProps extends NavigationLogoData {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({icon, text, className}) => {
    const imageData = getMediaImage(icon);

    return (
        <RouterLink href="/" passHref>
            <div className={b(null, className)}>
                {imageData && <Image className={b('icon')} {...imageData} />}
                <span className={b('text')}>{text}</span>
            </div>
        </RouterLink>
    );
};

export default Logo;
