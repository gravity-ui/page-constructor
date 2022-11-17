import React from 'react';
import block from 'bem-cn-lite';

import {NavigationLogo} from '../../../../models/navigation';
import {Image} from '../../../index';
import RouterLink from '../../../RouterLink/RouterLink';

import './Logo.scss';

const b = block('logo');

export interface LogoProps extends NavigationLogo {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({icon, text, className}) => (
    <RouterLink href="/" passHref>
        <div className={b(null, className)}>
            {icon && <Image className={b('icon')} src={icon} />}
            <span className={b('text')}>{text}</span>
        </div>
    </RouterLink>
);

export default Logo;
