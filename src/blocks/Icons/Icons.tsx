import React from 'react';

import {block} from '../../utils';
import {IconsBlockProps} from '../../models';
import {BlockHeader, Image} from '../../components';

import './Icons.scss';

const b = block('icons-block');

const Icons: React.FC<IconsBlockProps> = ({title, size = 's', items}) => (
    <div className={b({size})}>
        {title && <BlockHeader className={b('header')} title={title} colSizes={{all: 12}} />}
        {items.map((item) => (
            <div className={b('item')} key={item.url}>
                <Image className={b('image')} src={item.url} />
                <p className={b('text')}>{item.text}</p>
            </div>
        ))}
    </div>
);

export default Icons;
