import React from 'react';

import {block} from '../../utils';

import './MetaInfo.scss';

const b = block('meta-info');

export interface MetaInfpoProps {
    items: string[];
}

const MetaInfo = ({items}: MetaInfpoProps) => (
    <div className={b()}>
        {items.map((metaInfoItem) => (
            <div key={metaInfoItem} className={b('item')}>
                {metaInfoItem}
            </div>
        ))}
    </div>
);
export default MetaInfo;
