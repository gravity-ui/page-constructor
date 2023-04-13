import React, {useContext} from 'react';

import {Button, HTML, Media, RouterLink} from '../../components';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs/HeaderBreadcrumbs';
import {getMediaImage} from '../../components/Media/Image/utils';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import {MobileContext} from '../../context/mobileContext';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {Col, Grid, Row} from '../../grid';
import {ClassNameProps, HeaderBlockBackground, HeaderBlockProps, WithChildren} from '../../models';
import {block, getThemedValue} from '../../utils';

import {getImageSize, getTitleSizes, titleWithImageSizes} from './utils';

import './Header.scss';

const b = block('header-block');

type HeaderBlockFullProps = HeaderBlockProps & ClassNameProps;

interface BackgroundProps {
    background: HeaderBlockBackground;
    isMobile: boolean;
}

const Background = ({background, isMobile}: BackgroundProps) => {
    const {url, image, fullWidthMedia, video, color} = background;
    const imageObject = url ? getMediaImage(url) : image;
    const renderMedia = !isMobile || (typeof image === 'object' && 'mobile' in image);

    return (
        <div
            className={b('background', {media: true, 'full-width-media': fullWidthMedia})}
            style={{backgroundColor: color}}
        >
            {renderMedia && (
                <Media
                    {...background}
                    className={b('background-media')}
                    imageClassName={b('image')}
                    videoClassName={b('video')}
                    isBackground={true}
                    parallax={false}
                    video={isMobile ? undefined : video}
                    image={imageObject}
                />
            )}
        </div>
    );
};

interface FullWidthBackgroundProps {
    background: HeaderBlockBackground;
}

const FullWidthBackground = ({background}: FullWidthBackgroundProps) => (
    <div
        className={b('background', {['full-width']: true})}
        style={{backgroundColor: background?.color}}
    />
);

export const HeaderBlock = (props: WithChildren<HeaderBlockFullProps>) => {
    const {
        title,
        overtitle,
        description,
        buttons,
        image,
        video,
        width = 'm',
        imageSize,
        offset = 'default',
        background,
        theme: textTheme = 'light',
        verticalOffset = 'm',
        className,
        breadcrumbs,
        status,
        children,
    } = props;
    const isMobile = useContext(MobileContext);
    const {themeValue: theme} = useContext(ThemeValueContext);
    const hasRightSideImage = Boolean(image || video);
    const curImageSize = imageSize || getImageSize(width);
    const titleSizes = hasRightSideImage ? titleWithImageSizes(curImageSize) : getTitleSizes(width);
    let curVerticalOffset = verticalOffset;

    if (hasRightSideImage && !verticalOffset) {
        curVerticalOffset = 'm';
    }

    const backgroundThemed = background && getThemedValue(background, theme);
    const imageThemed = image && getThemedValue(image, theme);
    const videoThemed = video && getThemedValue(video, theme);
    const fullWidth = backgroundThemed?.fullWidth || backgroundThemed?.fullWidthMedia;

    return (
        <header
            className={b({['has-media']: hasRightSideImage, ['full-width']: fullWidth}, className)}
        >
            {backgroundThemed && fullWidth && <FullWidthBackground background={backgroundThemed} />}
            {backgroundThemed && <Background background={backgroundThemed} isMobile={isMobile} />}
            <Grid containerClass={b('container-fluid')}>
                {breadcrumbs && (
                    <Row className={b('breadcrumbs')}>
                        <Col>
                            <HeaderBreadcrumbs {...breadcrumbs} theme={textTheme} />
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col reset className={b('content-wrapper')}>
                        <Row>
                            <Col
                                className={b('content', {
                                    offset,
                                    theme: textTheme,
                                    'vertical-offset': curVerticalOffset,
                                })}
                            >
                                <Col sizes={titleSizes} className={b('content-inner')}>
                                    {overtitle && (
                                        <h4 className={b('overtitle')}>
                                            <HTML>{overtitle}</HTML>
                                        </h4>
                                    )}
                                    <h1 className={b('title')}>
                                        {status}
                                        <HTML>{title}</HTML>
                                    </h1>
                                    {description && (
                                        <h5 className={b('description')}>
                                            <YFMWrapper
                                                content={description}
                                                modifiers={{constructor: true}}
                                            />
                                        </h5>
                                    )}
                                    {buttons && (
                                        <div className={b('buttons')} data-qa="header-buttons">
                                            {buttons &&
                                                buttons.map((button, index) => (
                                                    <RouterLink href={button.url} key={index}>
                                                        <Button
                                                            key={index}
                                                            className={b('button')}
                                                            size="xl"
                                                            {...button}
                                                        />
                                                    </RouterLink>
                                                ))}
                                        </div>
                                    )}
                                    {children}
                                </Col>
                            </Col>
                        </Row>
                        {hasRightSideImage && (
                            <Media
                                className={b('media', {[curImageSize]: true})}
                                videoClassName={b('video')}
                                imageClassName={b('image')}
                                video={videoThemed}
                                image={imageThemed}
                            />
                        )}
                    </Col>
                </Row>
            </Grid>
        </header>
    );
};

export default HeaderBlock;
