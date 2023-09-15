import React, {ReactElement, useMemo, useState} from 'react';

import {MediaProps, QAProps} from '../../models';
import {block, getQaAttrubutes} from '../../utils';
import YoutubeBlock from '../VideoBlock/VideoBlock';

import DataLens from './DataLens/DataLens';
import FullscreenVideo from './FullscreenVideo/FullscreenVideo';
import Image, {ImageAdditionProps} from './Image/Image';
import Video, {VideoAdditionProps} from './Video/Video';

import './Media.scss';

const b = block('Media');

export interface MediaAllProps extends MediaProps, VideoAdditionProps, ImageAdditionProps, QAProps {
    className?: string;
    youtubeClassName?: string;
}

export const Media = (props: MediaAllProps) => {
    const {
        image,
        video,
        youtube,
        dataLens,
        color,
        height,
        previewImg,
        parallax = false,
        metrika,
        fullscreen,
        analyticsEvents,
        className,
        imageClassName,
        videoClassName,
        youtubeClassName,
        playVideo = true,
        isBackground,
        playButton,
        customBarControlsClassName,
        qa,
        ratio,
    } = props;

    const [hasVideoFallback, setHasVideoFallback] = useState(false);

    const qaAttributes = getQaAttrubutes(qa, 'video');

    const content = useMemo(() => {
        let result: ReactElement | ReactElement[] = [];

        if (image) {
            result.push(
                <Image
                    key="image"
                    parallax={parallax}
                    image={image}
                    height={height}
                    imageClassName={imageClassName}
                    isBackground={isBackground}
                    video={video}
                    hasVideoFallback={hasVideoFallback}
                    fullscreen={fullscreen}
                    qa={qaAttributes.image}
                />,
            );
        }

        if (video) {
            const videoProps = {
                key: 'video',
                video,
                videoClassName,
                height,
                metrika,
                analyticsEvents,
                playVideo,
                previewImg,
                playButton,
                customBarControlsClassName,
                hasVideoFallback,
                setHasVideoFallback,
                ratio,
            };

            if (fullscreen) {
                result.push(<FullscreenVideo {...videoProps} qa={qaAttributes.video} />);
            } else {
                result.push(<Video {...videoProps} qa={qaAttributes.video} />);
            }
        }

        if (youtube) {
            result = (
                <YoutubeBlock
                    className={b('youtube', youtubeClassName)}
                    record={youtube}
                    attributes={{color: 'white', rel: '0'}}
                    previewImg={previewImg}
                    height={height}
                    fullscreen={fullscreen}
                    analyticsEvents={analyticsEvents}
                />
            );
        }

        if (dataLens) {
            result = <DataLens dataLens={dataLens} />;
        }

        return result;
    }, [
        image,
        video,
        youtube,
        dataLens,
        parallax,
        height,
        imageClassName,
        isBackground,
        hasVideoFallback,
        fullscreen,
        qaAttributes.image,
        qaAttributes.video,
        videoClassName,
        metrika,
        analyticsEvents,
        playVideo,
        previewImg,
        playButton,
        customBarControlsClassName,
        youtubeClassName,
    ]);

    return (
        <div className={b(null, className)} style={{backgroundColor: color}} data-qa={qa}>
            {content}
        </div>
    );
};

export default Media;
