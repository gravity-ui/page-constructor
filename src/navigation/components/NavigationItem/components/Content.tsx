import React, {Fragment} from 'react';

import {block} from '../../../../utils';
import {Image} from '../../../../components';
import {ImageProps} from '../../../../models';

import '../NavigationItem.scss';

const b = block('navigation-item');

export const Content: React.FC<{text: string; icon?: ImageProps}> = ({text, icon}) => (
    <Fragment>
        {icon && typeof icon !== 'string' && <Image className={b('icon')} {...icon} />}
        <span className={b('text')}>{text}</span>
    </Fragment>
);
