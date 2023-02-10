import React from 'react';

import {ClassNameProps} from 'src/models';
import {block} from '../../utils';

import './MetaInfo.scss';

const b = block('meta-info');

export interface MetaInfpoProps extends ClassNameProps {
    items: string[];
}

const MetaInfo = ({items, className}: MetaInfpoProps) => (
    <div className={b(null, className)}>
        {items.map((metaInfoItem) => (
            <div key={metaInfoItem} className={b('item')}>
                {metaInfoItem}
            </div>
        ))}
    </div>
);
export default MetaInfo;
