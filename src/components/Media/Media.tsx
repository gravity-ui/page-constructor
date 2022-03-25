import React, {ReactElement, useState} from 'react';

import {block} from '../../utils';
import {MediaProps} from '../../models';
import Image, {ImageAdditionProps} from './Image/Image';
import DataLens from './DataLens/DataLens';
import Video, {VideoAdditionProps} from './Video/Video';
import YoutubeBlock from '../VideoBlock/VideoBlock';

import './Media.scss';

const b = block('Media');

interface MediaAllProps extends MediaProps, VideoAdditionProps, ImageAdditionProps {
    className?: string;
    youtubeClassName?: string;
}

interface WrapperProps {
    children: ReactElement | ReactElement[];
}

const Media: React.FC<MediaAllProps> = (props) => {
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

    const Wrapper = ({children}: WrapperProps) => (
        <div className={b(null, className)} style={{backgroundColor: color}}>
            {children}
        </div>
    );

    if (youtube) {
        return (
            <Wrapper>
                <YoutubeBlock
                    className={b('youtube', youtubeClassName)}
                    record={youtube}
                    attributes={{color: 'white', rel: '0'}}
                    previewImg={previewImg}
                />
            </Wrapper>
        );
    }

    if (dataLens) {
        return (
            <Wrapper>
                <DataLens dataLens={dataLens} />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <>
                {video ? (
                    <Video
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
                    />
                ) : null}
                {image ? (
                    <Image
                        parallax={parallax}
                        image={image}
                        height={height}
                        imageClassName={imageClassName}
                        isBackground={isBackground}
                        video={video}
                        hasVideoFallback={hasVideoFallback}
                    />
                ) : null}
            </>
        </Wrapper>
    );
};

export default Media;
