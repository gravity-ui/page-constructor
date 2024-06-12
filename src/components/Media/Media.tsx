import React, {ReactElement, useMemo, useState} from 'react';

import {MediaProps, QAProps} from '../../models';
import {block, getQaAttrubutes} from '../../utils';
import YoutubeBlock from '../VideoBlock/VideoBlock';

import DataLens from './DataLens/DataLens';
import FullscreenVideo from './FullscreenVideo/FullscreenVideo';
import Iframe from './Iframe/Iframe';
import Image, {ImageAdditionProps} from './Image/Image';
import Video, {VideoAdditionProps} from './Video/Video';

import './Media.scss';

const b = block('Media');

export interface MediaAllProps extends MediaProps, VideoAdditionProps, ImageAdditionProps, QAProps {
    className?: string;
    isFullscreenImageCover?: boolean;
    youtubeClassName?: string;
    autoplay?: boolean;
    onImageLoad?: () => void;
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
        fullscreen,
        isFullscreenImageCover,
        analyticsEvents,
        className,
        imageClassName,
        videoClassName,
        youtubeClassName,
        disableImageSliderForArrayInput,
        playVideo = true,
        isBackground,
        playButton,
        customBarControlsClassName,
        qa,
        ratio,
        autoplay,
        onImageLoad,
        iframe,
        margins,
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
                    disableImageSliderForArrayInput={disableImageSliderForArrayInput}
                    height={height}
                    imageClassName={imageClassName}
                    fullscreenClassName={
                        isFullscreenImageCover ? b('fullscreen-image-cover') : undefined
                    }
                    isBackground={isBackground}
                    video={video}
                    hasVideoFallback={hasVideoFallback}
                    fullscreen={fullscreen}
                    qa={qaAttributes.image}
                    onLoad={onImageLoad}
                />,
            );
        }

        if (video) {
            const videoProps = {
                key: 'video',
                video,
                videoClassName,
                height,
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
                    autoplay={autoplay}
                    onImageLoad={onImageLoad}
                />
            );
        }

        if (dataLens) {
            result = <DataLens dataLens={dataLens} />;
        }

        if (iframe) {
            result = <Iframe iframe={iframe} margins={margins} />;
        }

        return result;
    }, [
        image,
        video,
        youtube,
        dataLens,
        iframe,
        parallax,
        disableImageSliderForArrayInput,
        height,
        imageClassName,
        isBackground,
        hasVideoFallback,
        fullscreen,
        isFullscreenImageCover,
        qaAttributes.image,
        qaAttributes.video,
        onImageLoad,
        videoClassName,
        analyticsEvents,
        playVideo,
        previewImg,
        playButton,
        customBarControlsClassName,
        ratio,
        youtubeClassName,
        autoplay,
        margins,
    ]);

    return (
        <div className={b(null, className)} style={{backgroundColor: color}} data-qa={qa}>
            {content}
        </div>
    );
};

export default Media;
