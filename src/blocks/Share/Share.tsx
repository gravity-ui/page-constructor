import React, {useContext, FC, SVGProps} from 'react';
import {Icon, Button} from '@gravity-ui/uikit';

import {block, getAbsolutePath, getShareLink} from '../../utils';
import {ShareBlockProps} from '../../models';
import {LocationContext} from '../../context/locationContext';
import i18n from './i18n';

import {Facebook} from '../../icons/Facebook';
import {Twitter} from '../../icons/Twitter';
import {Linkedin} from '../../icons/Linkedin';
import {Vk} from '../../icons/Vk';
import {Telegram} from '../../icons/Telegram';

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
                            className={b('item', {type: type.toLowerCase()})}
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
