import React, {FC, SVGProps, useCallback, useContext} from 'react';

import {Button, Icon} from '@gravity-ui/uikit';

import {LocationContext} from '../../context/locationContext';
import {useAnalytics} from '../../hooks';
import {Facebook} from '../../icons/Facebook';
import {Linkedin} from '../../icons/Linkedin';
import {Telegram} from '../../icons/Telegram';
import {Twitter} from '../../icons/Twitter';
import {Vk} from '../../icons/Vk';
import {DefaultEventNames, ShareBlockProps} from '../../models';
import {block, getAbsolutePath, getShareLink} from '../../utils';

import {i18n} from './i18n';

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
                {items &&
                    items.map((type) => {
                        const url = getAbsolutePath(hostname, pathname);
                        const socialUrl = getShareLink(url, type);
                        const icon = icons[type];
                        const urlTitle = i18n(`${type}-title`);
                        const buttonLabel = i18n(`${type}-label`);

                        return (
                            <Button
                                key={type}
                                view="flat"
                                size="l"
                                target="_blank"
                                href={socialUrl}
                                className={b('item', {type: type.toLowerCase()})}
                                onClick={handleButtonClick}
                                title={urlTitle}
                                extraProps={{
                                    'aria-label': buttonLabel,
                                }}
                            >
                                {icon && (
                                    <Icon data={icon} size={24} className={b('icon', {type})} />
                                )}
                            </Button>
                        );
                    })}
            </div>
        </div>
    );
};

export default Share;
