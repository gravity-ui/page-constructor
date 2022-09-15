import React, {useContext} from 'react';

import {ShareList, ShareSocialNetwork} from '@gravity-ui/uikit';

import {block, getAbsolutePath} from '../../utils';
import {PCShareSocialNetwork, ReactFCC} from '../../models';
import {LocationContext} from '../../context/locationContext';
import i18n from './i18n';

import './Share.scss';

const b = block('share-block');

// TODO https://st.yandex-team.ru/CLOUDFRONT-11753
const pcShareSocialNetwork = {
    [PCShareSocialNetwork.Vk]: ShareSocialNetwork.VK,
    [PCShareSocialNetwork.Telegram]: ShareSocialNetwork.Telegram,
    [PCShareSocialNetwork.Twitter]: ShareSocialNetwork.Twitter,
    [PCShareSocialNetwork.Facebook]: ShareSocialNetwork.Facebook,
};

export interface ShareProps {
    items: PCShareSocialNetwork[];
    title?: string;
}

const Share: ReactFCC<ShareProps> = ({items, title}) => {
    const {pathname, hostname} = useContext(LocationContext);

    return (
        <div className={b()}>
            <h5 className={b('title')}>{title || i18n('constructor-share')}</h5>
            <div className={b('items')}>
                {items.map((type) => (
                    <ShareList.Item
                        key={type}
                        url={getAbsolutePath(hostname, pathname)}
                        className={b('item', {type: type.toLowerCase()})}
                        type={pcShareSocialNetwork[type]}
                    />
                ))}
            </div>
        </div>
    );
};

export default Share;
