import * as React from 'react';

import {InnerContext} from '../../context/innerContext';
import {MediaProps, QAProps} from '../../models';
import {block, getQaAttrubutes} from '../../utils';
import {sanitizeMicrodata} from '../../utils/microdata';
import IframeVideoBlock from '../VideoBlock/VideoBlock';

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
        videoIframe,
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
        videoMicrodata,
    } = props;

    const [hasVideoFallback, setHasVideoFallback] = React.useState(false);
    const {microdata} = React.useContext(InnerContext);

    const qaAttributes = getQaAttrubutes(qa, 'video');

    const content = React.useMemo(() => {
        let result: React.ReactElement | React.ReactElement[] = [];

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

        if (youtube || videoIframe) {
            result = (
                <IframeVideoBlock
                    className={b('youtube', youtubeClassName)}
                    record={youtube}
                    videoIframe={videoIframe}
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
        videoIframe,
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

    const videoMicrodataScript = React.useMemo(() => {
        const {name, description} = videoMicrodata || {};
        const json = JSON.stringify({
            '@context': 'http://schema.org/',
            '@type': 'VideoObject',
            uploadDate: microdata?.contentUpdatedDate,
            contentUrl: video?.src?.[0] || videoIframe || youtube,
            thumbnailUrl: previewImg,
            ...(videoMicrodata || {}),
            name: name ? sanitizeMicrodata(name) : name,
            description: description ? sanitizeMicrodata(description) : description,
        });

        return video || youtube || videoIframe ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json}} />
        ) : null;
    }, [microdata?.contentUpdatedDate, previewImg, video, videoIframe, videoMicrodata, youtube]);

    return (
        <div className={b(null, className)} style={{backgroundColor: color}} data-qa={qa}>
            {videoMicrodataScript}
            {content}
        </div>
    );
};

export default Media;
