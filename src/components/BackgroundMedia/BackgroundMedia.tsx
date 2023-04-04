import React, {useContext} from 'react';

import {block} from '../../utils';
import {BackgroundMediaProps} from '../../models';
import Media from '../Media/Media';
import AnimateBlock from '../AnimateBlock/AnimateBlock';
import {MobileContext} from '../../context/mobileContext';

import './BackgroundMedia.scss';

const b = block('BackgroundMedia');

const BackgroundMedia = ({
    className,
    color,
    animated,
    parallax = true,
    video,
    mediaClassName,
    fullWidthMedia,
    ...props
}: BackgroundMediaProps) => {
    const isMobile = useContext(MobileContext);

    return (
        <AnimateBlock
            className={b(null, className)}
            style={{backgroundColor: color}}
            animate={animated}
        >
            <Media
                className={b('media', {'full-width-media': fullWidthMedia}, mediaClassName)}
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
