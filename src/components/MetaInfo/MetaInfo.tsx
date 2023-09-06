import React from 'react';

import {ClassNameProps} from 'src/models';

import {block} from '../../utils';
import {YFMWrapper} from '../index';

import './MetaInfo.scss';

const b = block('meta-info');

export interface MetaInfpoProps extends ClassNameProps {
    items: string[];
}

const MetaInfo = ({items, className}: MetaInfpoProps) => (
    <h4 className={b(null, className)}>
        {items.map((metaInfoItem) => (
            <YFMWrapper
                content={metaInfoItem}
                key={metaInfoItem}
                className={b('item')}
                modifiers={{constructor: true, constructorMetaInfo: true}}
            />
        ))}
    </h4>
);
export default MetaInfo;
