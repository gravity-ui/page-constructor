import React from 'react';

import {render, screen} from '@testing-library/react';

import {getQaAttrubutes} from '../../..';
import {testAnimated, testCustomClassName} from '../../../../test-utils/shared/common';
import {BackgroundMediaProps} from '../../../models';
import BackgroundMedia from '../BackgroundMedia';

const qaId = 'background-media-component';

const imageUrl = '/mock.png';
const videoProps = {
    src: ['/mock.mp4'],
};

const qaAttributes = getQaAttrubutes(
    qaId,
    'media',
    'media-video',
    'media-video-source',
    'media-image-background-image',
    'media-image-animate',
);

describe('BackgroundMedia', () => {
    test('render component by default', async () => {
        render(<BackgroundMedia qa={qaId} />);
        const component = screen.getByTestId(qaAttributes.animate);

        expect(component).toBeInTheDocument();
    });

    test('add className', () => {
        testCustomClassName<BackgroundMediaProps>({
            component: BackgroundMedia,
            props: {qa: qaId},
            options: {qaId: qaAttributes.animate},
        });
    });

    test('render with animated', async () => {
        testAnimated<BackgroundMediaProps>({
            component: BackgroundMedia,
            props: {qa: qaId},
            options: {qaId: qaAttributes.animate},
        });
    });

    test('render with passed color', () => {
        const style = {backgroundColor: 'red'};

        render(<BackgroundMedia color={style.backgroundColor} qa={qaId} />);
        const component = screen.getByTestId(qaAttributes.media);

        expect(component).toHaveStyle(style);
    });

    test('add className to media component', () => {
        const className = 'my-class';

        render(<BackgroundMedia qa={qaId} mediaClassName={className} />);
        const component = screen.getByTestId(qaAttributes.media);

        expect(component).toHaveClass(className);
    });

    test('render video', () => {
        render(<BackgroundMedia qa={qaId} video={videoProps} />);
        const component = screen.getByTestId(qaAttributes.mediaVideoSource);

        expect(component).toBeInTheDocument();
    });

    test('render video with videoClassName', () => {
        render(<BackgroundMedia qa={qaId} video={videoProps} />);
        const component = screen.getByTestId(qaAttributes.mediaVideo);

        expect(component).toHaveClass('pc-BackgroundMedia__video');
    });

    test('render video with default height', () => {
        const style = {height: '720px'};
        render(<BackgroundMedia qa={qaId} video={videoProps} />);
        const component = screen.getByTestId(qaAttributes.mediaVideo);

        expect(component).toHaveStyle(style);
    });

    test('render video with custom height', () => {
        const height = 300;
        const style = {height: `${height}px`};

        render(<BackgroundMedia qa={qaId} video={videoProps} height={height} />);
        const component = screen.getByTestId(qaAttributes.mediaVideo);
        expect(component).toHaveStyle(style);
    });

    test('render with fullWidthMedia prop', () => {
        render(<BackgroundMedia qa={qaId} fullWidthMedia />);
        const component = screen.getByTestId(qaAttributes.media);

        expect(component).toHaveClass('pc-BackgroundMedia__media_full-width-media');
    });

    test('render image', () => {
        const imageQaAttributes = getQaAttrubutes(
            qaAttributes.mediaImageBackgroundImage,
            'image-desktop-source-compressed',
        );
        render(<BackgroundMedia qa={qaId} image={imageUrl} />);
        const component = screen.getByTestId(imageQaAttributes.imageDesktopSourceCompressed);

        expect(component).toBeInTheDocument();
    });

    test('render image with imageClassName', () => {
        render(<BackgroundMedia qa={qaId} image={imageUrl} />);
        const component = screen.getByTestId(qaAttributes.mediaImageBackgroundImage);

        expect(component).toHaveClass('pc-BackgroundMedia__image');
    });

    test('render image with default height', () => {
        const style = {height: '720px'};
        render(<BackgroundMedia qa={qaId} image={imageUrl} />);
        const component = screen.getByTestId(qaAttributes.mediaImageBackgroundImage);

        expect(component).toHaveStyle(style);
    });

    test('render image with custom height', () => {
        const height = 300;
        const style = {height: `${height}px`};

        render(<BackgroundMedia qa={qaId} image={imageUrl} height={height} />);
        const component = screen.getByTestId(qaAttributes.mediaImageBackgroundImage);

        expect(component).toHaveStyle(style);
    });

    test('do not render image when video is provided', () => {
        render(<BackgroundMedia qa={qaId} image={imageUrl} video={videoProps} />);
        const component = screen.getByTestId(qaAttributes.mediaImageBackgroundImage);

        expect(component).toHaveClass('pc-media-component-image__item_withVideo');
    });

    test('render image with parallax', () => {
        const style = {transform: 'translateY(0px)'};

        render(<BackgroundMedia qa={qaId} parallax image={imageUrl} />);
        const component = screen.getByTestId(qaAttributes.mediaImageAnimate);

        expect(component).toHaveStyle(style);
    });
});
