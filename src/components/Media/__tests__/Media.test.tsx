import React from 'react';

import {render, screen} from '@testing-library/react';

import {MediaVideoControlsType} from '../../../models';
import Media, {MediaAllProps} from '../Media';

const testingLabel = 'Example of media description';
const videoSrc = [
    'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/video_8-12_white.webm',
    'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/video_8-12_white.mp4',
    'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/video_8-12_white.png',
];
const imageSrc =
    'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_6-12_light.png';

describe('Media', () => {
    test.each<MediaAllProps>([
        {video: {src: videoSrc, ariaLabel: testingLabel, controls: MediaVideoControlsType.Default}},
        {video: {src: videoSrc, ariaLabel: testingLabel, controls: MediaVideoControlsType.Custom}},
        {image: {src: imageSrc, alt: testingLabel}},
    ])('video should have aria-label', (props) => {
        render(<Media playVideo={false} {...props} />);
        const element = screen.getByLabelText(testingLabel);
        expect(element).toBeTruthy();
    });

    test.each<MediaAllProps>([
        {image: {src: imageSrc, alt: testingLabel}},
        {image: {src: imageSrc, desktop: imageSrc, alt: testingLabel}},
        {image: {src: imageSrc, mobile: imageSrc, alt: testingLabel}},
        {image: {src: imageSrc, mobile: imageSrc, alt: testingLabel, disableCompress: true}},
    ])('image should have customizable alt props', (props) => {
        render(<Media playVideo={false} {...props} />);
        const element = screen.getByAltText(testingLabel);
        expect(element).toBeTruthy();
    });
});
