import React, {ReactElement, useMemo, useState} from 'react';

import {block} from '../../utils';
import {MediaProps} from '../../models';
import Image, {ImageAdditionProps} from './Image/Image';
import DataLens from './DataLens/DataLens';
import Video, {VideoAdditionProps} from './Video/Video';
import YoutubeBlock from '../VideoBlock/VideoBlock';

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
                />,
            );
        }

        if (video) {
            result.push(
                <Video
                    key="video"
                    video={video}
                    videoClassName={videoClassName}
                    height={height}
                    metrika={metrika}
                    playVideo={playVideo}
                    previewImg={previewImg}
                    playButton={playButton}
                    customBarControlsClassName={customBarControlsClassName}
                    hasVideoFallback={hasVideoFallback}
                    setHasVideoFallback={setHasVideoFallback}
                />,
            );
        }

        if (youtube) {
            result = (
                <YoutubeBlock
                    className={b('youtube', youtubeClassName)}
                    record={youtube}
                    attributes={{color: 'white', rel: '0'}}
                    previewImg={previewImg}
                    height={height}
                    fullScreen={fullScreen}
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
        playVideo,
        previewImg,
        playButton,
        customBarControlsClassName,
        youtubeClassName,
        fullScreen,
    ]);

    return (
        <div className={b(null, className)} style={{backgroundColor: color}}>
            {content}
        </div>
    );
};

export default Media;
