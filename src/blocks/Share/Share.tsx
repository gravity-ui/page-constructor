import React, {useContext, FC, SVGProps, useCallback} from 'react';
import {Icon, Button} from '@gravity-ui/uikit';

import {block, getAbsolutePath, getShareLink} from '../../utils';
import {ShareBlockProps, DefaultEventNames} from '../../models';
import {LocationContext} from '../../context/locationContext';
import i18n from './i18n';
import {useAnalytics} from '../../hooks';

import {Facebook} from '../../icons/Facebook';
import {Twitter} from '../../icons/Twitter';
import {Linkedin} from '../../icons/Linkedin';
import {Vk} from '../../icons/Vk';
import {Telegram} from '../../icons/Telegram';
import {RouterLink} from '../../components';

import './Share.scss';

interface IconsProps {
    [key: string]: FC<SVGProps<SVGSVGElement>>;
}

const icons: IconsProps = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    vk: Vk,
    telegram: Telegram,
};

const b = block('share-block');

const Share = ({items, title}: ShareBlockProps) => {
    const {pathname, hostname} = useContext(LocationContext);
    const handleAnalytics = useAnalytics(DefaultEventNames.ShareButton);

    const handleButtonClick = useCallback(() => handleAnalytics(), [handleAnalytics]);

    return (
        <div className={b()}>
            <h5 className={b('title')}>{title || i18n('constructor-share')}</h5>
            <div className={b('items')}>
                {items.map((type) => {
                    const url = getAbsolutePath(hostname, pathname);
                    const socialUrl = getShareLink(url, type);
                    const icon = icons[type];

                    return (
                        <Button
                            key={type}
                            view="flat"
                            size="l"
                            target="_blank"
                            href={socialUrl}
                            component={RouterLink}
                            className={b('item', {type: type.toLowerCase()})}
                            onClick={handleButtonClick}
                        >
                            {icon && <Icon data={icon} size={24} className={b('icon', {type})} />}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};

export default Share;
