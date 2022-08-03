import React, {useContext} from 'react';
import {block, getAbsolutePath} from '../../utils';
import {ShareList} from '@yandex-cloud/uikit';

import {ShareProps} from '../../models';
import {LocationContext} from '../../context/locationContext';
import i18n from './i18n';

import './Share.scss';

const b = block('share-block');

const Share: React.FunctionComponent<ShareProps> = ({items, title}) => {
    const {pathname, hostname} = useContext(LocationContext);

    return (
        <div className={b()}>
            <h5 className={b('title')}>{title || i18n('constructor-share')}</h5>
            <div className={b('items')}>
                {items.map((type) => (
                    <ShareList.Item
                        key={type}
                        url={getAbsolutePath(hostname, pathname)}
                        className={b('item', {type})}
                        type={type}
                    />
                ))}
            </div>
        </div>
    );
};

export default Share;
