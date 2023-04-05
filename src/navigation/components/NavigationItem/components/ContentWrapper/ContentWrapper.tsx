import React, {Fragment} from 'react';

import {Image} from '../../../../../components';
import {ImageProps} from '../../../../../models';
import {block} from '../../../../../utils';

import './ContentWrapper.scss';

const b = block('content-wrapper');

export const ContentWrapper: React.FC<{text: string; icon?: ImageProps}> = ({text, icon}) => (
    <Fragment>
        {icon && typeof icon !== 'string' && <Image className={b('icon')} {...icon} />}
        <span className={b('text')}>{text}</span>
    </Fragment>
);
