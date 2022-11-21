import React from 'react';
import block from 'bem-cn-lite';

import {NavigationLogo} from '../../../../models';
import RouterLink from '../../../RouterLink/RouterLink';
import {getMediaImage} from '../../../Media/Image/utils';
import {Image} from '../../../index';

import './Logo.scss';

const b = block('logo');

export interface LogoProps extends NavigationLogo {
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
