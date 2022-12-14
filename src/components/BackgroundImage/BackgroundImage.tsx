import React from 'react';

import {block} from '../../utils';
import {BackgroundImageProps, WithChildren} from '../../models';
import Image from '../Image/Image';

import './BackgroundImage.scss';

const b = block('storage-background-image');

const BackgroundImage = (props: WithChildren<BackgroundImageProps>) => {
    const {children, src, desktop, className, imageClassName, style, hide} = props;

    return (
        <div className={b(null, className)} style={style}>
            {(src || desktop) && !hide && <Image {...props} className={b('img', imageClassName)} />}
            {children && <div className={b('container')}>{children}</div>}
        </div>
    );
};

export default BackgroundImage;
