import React, {ReactElement, useMemo, useState} from 'react';

import {MediaProps} from '../../models';
import {block} from '../../utils';
import YoutubeBlock from '../VideoBlock/VideoBlock';

import DataLens from './DataLens/DataLens';
import FullscreenVideo from './FullscreenVideo/FullscreenVideo';
import Image, {ImageAdditionProps} from './Image/Image';
import Video, {VideoAdditionProps} from './Video/Video';

import './Media.scss';

const b = block('Media');

export interface MediaAllProps extends MediaProps, VideoAdditionProps, ImageAdditionProps {
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
        fullScreen,
        fullscreen,
        analyticsEvents,
    } = props;
    const {
        className,
        imageClassName,
        videoClassName,
        youtubeClassName,
        playVideo = true,
        isBackground,
        playButton,
        customBarControlsClassName,
    } = props;

    const [hasVideoFallback, setHasVideoFallback] = useState(false);

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
                    fullscreen={fullScreen || fullscreen}
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
            };

            if (fullScreen || fullscreen) {
                result.push(<FullscreenVideo {...videoProps} />);
            } else {
                result.push(<Video {...videoProps} />);
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
                    fullscreen={fullScreen || fullscreen}
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
        videoClassName,
        metrika,
        analyticsEvents,
        playVideo,
        previewImg,
        playButton,
        customBarControlsClassName,
        youtubeClassName,
        fullScreen,
        fullscreen,
    ]);

    return (
        <div className={b(null, className)} style={{backgroundColor: color}}>
            {content}
        </div>
    );
};

export default Media;
