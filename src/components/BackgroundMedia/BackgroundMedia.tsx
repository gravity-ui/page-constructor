import React, {useContext} from 'react';

import {MobileContext} from '../../context/mobileContext';
import {Animatable, MediaProps} from '../../models';
import {block} from '../../utils';
import AnimateBlock from '../AnimateBlock/AnimateBlock';
import Media from '../Media/Media';

import './BackgroundMedia.scss';

const b = block('BackgroundMedia');

export interface FullProps extends MediaProps, Animatable {
    className?: string;
    mediaClassName?: string;
}

const BackgroundMedia = ({
    className,
    color,
    animated,
    parallax = true,
    video,
    mediaClassName,
    ...props
}: FullProps) => {
    const isMobile = useContext(MobileContext);

    return (
        <AnimateBlock
            className={b(null, className)}
            style={{backgroundColor: color}}
            animate={animated}
        >
            <Media
                className={b('media', mediaClassName)}
                imageClassName={b('image')}
                videoClassName={b('video')}
                isBackground={true}
                {...{
                    height: 720,
                    color,
                    parallax,
                    video: isMobile ? undefined : video,
                    ...props,
                }}
            />
        </AnimateBlock>
    );
};

export default BackgroundMedia;
