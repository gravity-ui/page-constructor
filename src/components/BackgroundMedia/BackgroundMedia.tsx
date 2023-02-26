import React, {useContext} from 'react';

import {MobileContext} from '../../context/mobileContext';
import {BackgroundMediaProps} from '../../models';
import {block, getQaAttrubutes} from '../../utils';
import AnimateBlock from '../AnimateBlock/AnimateBlock';
import Media from '../Media/Media';

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
    qa,
    ...props
}: BackgroundMediaProps) => {
    const isMobile = useContext(MobileContext);
    const qaAttributes = getQaAttrubutes(qa, 'media');

    return (
        <AnimateBlock
            className={b(null, className)}
            style={{backgroundColor: color}}
            animate={animated}
            qa={qaAttributes.animate}
        >
            <Media
                className={b('media', {'full-width-media': fullWidthMedia}, mediaClassName)}
                imageClassName={b('image')}
                videoClassName={b('video')}
                isBackground={true}
                qa={qaAttributes.media}
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
