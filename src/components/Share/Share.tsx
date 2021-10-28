import React, {useContext} from 'react';
import block from 'bem-cn-lite';
import {SocialShareLink} from '@yandex-data-ui/common';

import {ShareProps} from '../../models';
import {getAbsolutePath} from '../../utils';
import {LocationContext} from '../../context/locationContext';

import './Share.scss';

const b = block('share-block');

const Share: React.FunctionComponent<ShareProps> = ({items, title}) => {
    const {pathname, hostname} = useContext(LocationContext);

    return (
        <div className={b()}>
            {/*TODO: add i18n for constructor-share*/}
            <h5 className={b('title')}>{title || 'constructor-share'}</h5>
            <div className={b('items')}>
                {items.map((type) => (
                    <SocialShareLink
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
