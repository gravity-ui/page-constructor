import React, {useContext} from 'react';
import {HTML} from '@doc-tools/components';

import {block, getThemedValue} from '../../utils';
import {ClassNameProps, HeaderBlockBackground, HeaderBlockProps} from '../../models';
import {headerHasMediaBackground} from '../../models/guards';
import {Button, Media, BackgroundMedia, BackgroundImage, RouterLink} from '../../components';
import {Grid, Row, Col} from '../../grid';
import {getImageSize, getTitleSizes, titleWithImageSizes} from './utils';

import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs/HeaderBreadcrumbs';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';

import './Header.scss';

const b = block('header-block');

type HeaderBlockFullProps = HeaderBlockProps & ClassNameProps;

function renderBackground(background: HeaderBlockBackground) {
    const {url, color, disableCompress, fullWidth} = background;

    return headerHasMediaBackground(background) ? (
        <BackgroundMedia {...background} className={b('background', {media: true})} />
    ) : (
        <BackgroundImage
            src={url}
            className={b('background')}
            imageClassName={b('background-img')}
            style={{backgroundColor: fullWidth ? 'none' : color}}
            disableCompress={disableCompress}
        />
    );
}

function renderFullWidthBackground(background: HeaderBlockBackground) {
    return background?.fullWidth ? (
        <div
            className={b('background', {['full-width']: true})}
            style={{backgroundColor: background?.color}}
        />
    ) : null;
}

const HeaderBlock: React.FunctionComponent<HeaderBlockFullProps> = (props) => {
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
    const {themeValue: theme} = useContext(ThemeValueContext);
    const hasMedia = Boolean(image || video);
    const curImageSize = imageSize || getImageSize(width);
    const titleSizes = hasMedia ? titleWithImageSizes(curImageSize) : getTitleSizes(width);
    let curVerticalOffset = verticalOffset;

    if (hasMedia && !verticalOffset) {
        curVerticalOffset = 'm';
    }

    const backgroundThemed = background && getThemedValue(background, theme);
    const imageThemed = image && getThemedValue(image, theme);
    const videoThemed = video && getThemedValue(video, theme);

    return (
        <header
            className={b(
                {['has-media']: hasMedia, ['has-background']: Boolean(background)},
                className,
            )}
        >
            {backgroundThemed && renderFullWidthBackground(backgroundThemed)}
            <Grid>
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
                                {backgroundThemed && renderBackground(backgroundThemed)}
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
                        {hasMedia && (
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
