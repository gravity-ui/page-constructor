import React from 'react';

import {BackgroundImageProps, WithChildren} from '../../models';
import {block} from '../../utils';
import Image from '../Image/Image';

import './BackgroundImage.scss';

const b = block('storage-background-image');

const BackgroundImage = (props: WithChildren<BackgroundImageProps>) => {
    const {children, src, desktop, className, imageClassName, style, hide, qa} = props;

    return (
        <div className={b(null, className)} style={style} data-qa={qa}>
            {(src || desktop) && !hide && <Image {...props} className={b('img', imageClassName)} />}
            {children && <div className={b('container')}>{children}</div>}
        </div>
    );
};

export default BackgroundImage;
