import React from 'react';

import {ClassNameProps} from 'src/models';
import {block} from '../../utils';

import './MetaInfo.scss';

const b = block('meta-info');

export interface MetaInfpoProps extends ClassNameProps {
    items: string[];
}

const MetaInfo = ({items, className}: MetaInfpoProps) => (
    <h4 className={b(null, className)}>
        {items.map((metaInfoItem) => (
            <div key={metaInfoItem} className={b('item')}>
                {metaInfoItem}
            </div>
        ))}
    </h4>
);
export default MetaInfo;
