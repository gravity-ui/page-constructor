import React from 'react';
import block from 'bem-cn-lite';

import {MediaProps, Animatable} from '../../models';
import Media from '../Media/Media';
import AnimateBlock from '../AnimateBlock/AnimateBlock';

import './BackgroundMedia.scss';

const b = block('BackgroundMedia');

interface FullProps extends MediaProps, Animatable {
    className?: string;
}

const BackgroundMedia: React.FC<FullProps> = ({
    className,
    color,
    animated,
    parallax = true,
    ...props
}) => (
    <AnimateBlock
        className={b(null, className)}
        style={{backgroundColor: color}}
        animate={animated}
    >
        <Media
            className={b('media')}
            imageClassName={b('image')}
            videoClassName={b('video')}
            isBackground={true}
            {...{
                height: 720,
                color,
                parallax,
                ...props,
            }}
        />
    </AnimateBlock>
);

export default BackgroundMedia;
