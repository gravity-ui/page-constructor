import React from 'react';

import {render, screen} from '@testing-library/react';

import {MediaVideoControlsType} from '../../../models';
import Media, {MediaAllProps} from '../Media';

const videoTestingLabel = 'Example of video description';
const imageTestingLabel = 'Example of image description';
const videoSrc = ['/mock.webm', '/mock.mp4', '/mock.png'];
const imageSrc = '/mock.png';

describe('Media', () => {
    test.each<MediaAllProps>([
        {
            video: {
                src: videoSrc,
                ariaLabel: videoTestingLabel,
                controls: MediaVideoControlsType.Default,
            },
        },
        {
            video: {
                src: videoSrc,
                ariaLabel: videoTestingLabel,
                controls: MediaVideoControlsType.Custom,
            },
        },
    ])('video should have customizable aria-label', (props) => {
        render(<Media playVideo={false} {...props} />);
        const element = screen.getByLabelText(videoTestingLabel, {selector: 'video'});
        expect(element).toBeTruthy();
    });

    test.each<MediaAllProps>([
        {video: {src: videoSrc, controls: MediaVideoControlsType.Custom}},
        {video: {src: videoSrc, controls: MediaVideoControlsType.Default}},
    ])('video should not have aria-label if not set', (props) => {
        render(<Media playVideo={false} {...props} />);
        const element = screen.queryByLabelText(imageTestingLabel, {selector: 'video'});
        expect(element).toBeFalsy();
    });

    test.each<MediaAllProps>([
        {image: {src: imageSrc, alt: imageTestingLabel}},
        {image: {src: imageSrc, desktop: imageSrc, alt: imageTestingLabel}},
        {image: {src: imageSrc, mobile: imageSrc, alt: imageTestingLabel}},
        {image: {src: imageSrc, mobile: imageSrc, alt: imageTestingLabel, disableCompress: true}},
    ])('image should have customizable alt props', (props) => {
        render(<Media playVideo={false} {...props} />);
        const element = screen.getByAltText(imageTestingLabel);
        expect(element).toBeTruthy();
    });

    test.each<MediaAllProps>([
        {image: {src: imageSrc}},
        {image: {src: imageSrc, desktop: imageSrc}},
        {image: {src: imageSrc, mobile: imageSrc}},
        {image: {src: imageSrc, mobile: imageSrc, disableCompress: true}},
    ])('image should not have alt attribute if not set', (props) => {
        render(<Media playVideo={false} {...props} />);
        const element = screen.queryByAltText(imageTestingLabel);
        expect(element).toBeFalsy();
    });

    test.each<MediaAllProps>([
        {
            image: {src: imageSrc, alt: imageTestingLabel},
            video: {
                src: videoSrc,
                ariaLabel: videoTestingLabel,
                controls: MediaVideoControlsType.Default,
            },
        },
    ])('should have both custom alt and aria-label', (props) => {
        render(<Media playVideo={false} {...props} />);
        const imageElement = screen.getByAltText(imageTestingLabel);
        const videoElement = screen.getByLabelText(videoTestingLabel);
        expect(imageElement).toBeTruthy();
        expect(videoElement).toBeTruthy();
    });
});
