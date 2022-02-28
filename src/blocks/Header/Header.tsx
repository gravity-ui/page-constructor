import React, {useContext} from 'react';
import {HTML} from '@doc-tools/components';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {block, getThemedValue} from '../../utils';
import {
    HeaderBlockBackground,
    HeaderBlockProps,
    headerHasMediaBackground,
    HeaderImageSize,
    HeaderWidth,
} from '../../models';
import {Button, Media, BackgroundMedia, BackgroundImage} from '../../components';
import {Grid, Row, Col} from '../../grid';

import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import FullWidthBackground from '../../components/FullWidthBackground/FullWidthBackground';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs/HeaderBreadcrumbs';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';

import './Header.scss';

const b = block('header-block');

type HeaderBlockFullProps = HeaderBlockProps & ClassNameProps;

function titleWithImageSizes(imageSize: HeaderImageSize) {
    switch (imageSize) {
        case 's':
            return {
                md: 8,
                all: 12,
            };
        case 'm':
            return {
                md: 6,
                all: 12,
            };
        default:
            return {all: 12};
    }
}

function getTitleSizes(width: HeaderWidth) {
    switch (width) {
        case 's':
            return {
                lg: 6,
                sm: 12,
                md: 6,
                all: 12,
            };
        case 'm':
            return {
                lg: 8,
                md: 8,
                sm: 12,
                all: 12,
            };
        default:
            return {all: 12};
    }
}

function renderBackground(background: HeaderBlockBackground) {
    return headerHasMediaBackground(background) ? (
        <BackgroundMedia {...background} className={b('background-media')} />
    ) : (
        <BackgroundImage
            src={background.url}
            className={b('background')}
            imageClassName={b('background-img')}
            style={{backgroundColor: background.fullWidth ? '' : background?.color}}
            disableCompress={background?.disableCompress}
        />
    );
}

function renderFullWidthBackground(background: HeaderBlockBackground) {
    return !headerHasMediaBackground(background) && Boolean(background?.fullWidth) ? (
        <FullWidthBackground style={{backgroundColor: background?.color}} theme="rounded" />
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
        width = 'l',
        offset = 'default',
        imageSize = 'm',
        background,
        theme: textTheme = 'default',
        verticalOffset,
        className,
        breadcrumbs,
        children,
    } = props;
    const {themeValue: theme} = useContext(ThemeValueContext);
    const hasMedia = Boolean(image || video);
    const titleSizes = hasMedia ? titleWithImageSizes(imageSize) : getTitleSizes(width);
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
            {breadcrumbs && (
                <HeaderBreadcrumbs
                    {...breadcrumbs}
                    className={b('breadcrumbs')}
                    theme={textTheme}
                />
            )}
            {backgroundThemed && renderFullWidthBackground(backgroundThemed)}
            <Grid
                className={b('content', {
                    offset,
                    theme: textTheme,
                    'vertical-offset': curVerticalOffset,
                })}
            >
                {backgroundThemed && renderBackground(backgroundThemed)}
                <Row className={b('content-outer')}>
                    <Col sizes={titleSizes} className={b('content-inner')}>
                        {overtitle && (
                            <h4 className={b('overtitle')}>
                                <HTML>{overtitle}</HTML>
                            </h4>
                        )}
                        <h1 className={b('title')}>
                            <HTML>{title}</HTML>
                        </h1>
                        {description && (
                            <h5 className={b('description')}>
                                <YFMWrapper
                                    content={description}
                                    modifiers={{
                                        constructorHeaderDescription: true,
                                    }}
                                />
                            </h5>
                        )}
                        {buttons && (
                            <div className={b('buttons')} data-qa="header-buttons">
                                {buttons &&
                                    buttons.map((button, index) => (
                                        <Button
                                            key={index}
                                            className={b('button')}
                                            size="xl"
                                            {...button}
                                        />
                                    ))}
                            </div>
                        )}
                        {children}
                    </Col>
                </Row>
                {hasMedia && (
                    <Media
                        className={b('media', {[imageSize]: true})}
                        videoClassName={b('video')}
                        imageClassName={b('image')}
                        video={videoThemed}
                        image={imageThemed}
                    />
                )}
            </Grid>
        </header>
    );
};

export default HeaderBlock;
