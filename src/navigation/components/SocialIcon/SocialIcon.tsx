import * as React from 'react';

import {Image} from '../../../components';
import {getMediaImage} from '../../../components/Media/Image/utils';
import {NavigationSocialItem} from '../../../models';
import {block} from '../../../utils';

import './SocialIcon.scss';

const b = block('social-icon');

export interface NavigationSocialItemOwnProps extends NavigationSocialItem {
    className?: string;
}

const SocialIcon = ({
    icon,
    url,
    className,
    urlTitle,
}: React.PropsWithChildren<NavigationSocialItemOwnProps>) => {
    const iconData = getMediaImage(icon);
    const {alt} = iconData;

    return (
        <a
            href={url}
            aria-label={alt}
            title={urlTitle || alt}
            target="_blank"
            rel="noopener noreferrer"
            className={b(null, className)}
        >
            <Image className={b('icon')} {...iconData} />
        </a>
    );
};

export default SocialIcon;
