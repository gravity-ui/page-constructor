'use client';

import * as React from 'react';

import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs/HeaderBreadcrumbs';
import Media from '../../components/Media/Media';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import {BREAKPOINTS} from '../../constants';
import {useTheme} from '../../context/theme';
import {useWindowWidth} from '../../context/windowWidthContext';
import {Grid} from '../../grid';
import {ButtonProps, HeroBlockProps, Theme} from '../../models';
import Content from '../../sub-blocks/Content/Content';
import {block, getQaAttrubutes, getThemedValue} from '../../utils';

import {useContainerAspectRatio} from './hooks';

import './Hero.scss';

const b = block('hero-block');

const QA_ID = 'hero-block';

const Hero = (props: HeroBlockProps) => {
    const {
        breadcrumbs,
        overtitle,
        buttons,
        media: themedMedia,
        fullWidth,
        verticalOffset = 'm',
        theme: contentTheme = 'default',
        background: themedBackground,
        ...contentProps
    } = props;

    const qaAttributes = getQaAttrubutes(QA_ID, [
        'background',
        'beadcrumbs',
        'content-wrapper',
        'content-overtitle',
        'media-wrapper',
        'media',
    ]);

    const [mediaAspectRatio, setMediaAspectRatio] = React.useState<number>(Infinity);

    const {aspectRatio: mediaContainerAspectRatio, ref: mediaContainerRef} =
        useContainerAspectRatio();

    const isDesktop = useWindowWidth() > BREAKPOINTS.md;
    const isMediaVertical = mediaAspectRatio < mediaContainerAspectRatio;

    const contextTheme = useTheme();
    const theme = contentTheme === 'default' ? contextTheme : (contentTheme as Theme);

    const background = getThemedValue(themedBackground, theme);
    const media = getThemedValue(themedMedia, theme);

    const buttonProps = React.useMemo<(ButtonProps | React.ReactNode)[] | undefined>(
        () =>
            buttons?.map((buttonThemed) => {
                if (React.isValidElement(buttonThemed)) {
                    return buttonThemed;
                }

                const button = getThemedValue(buttonThemed, theme) as ButtonProps;

                return {
                    size: 'xl',
                    ...button,
                };
            }),
        [buttons, theme],
    );

    const onMediaIntrinsicSizeChange = React.useCallback(
        ({width, height}: {width: number; height: number}) => setMediaAspectRatio(width / height),
        [],
    );

    return (
        <header className={b()} data-qa={qaAttributes.default}>
            {background && (
                <Media
                    className={b('background', {
                        ['full-width']: fullWidth,
                    })}
                    imageClassName={b('background-image')}
                    videoClassName={b('background-video')}
                    {...background}
                    isBackground
                    qa={qaAttributes.background}
                />
            )}
            <Grid>
                <div className={b('wrapper')} data-qa={qaAttributes.wrapper}>
                    {breadcrumbs && (
                        <HeaderBreadcrumbs
                            className={b('breadcrumbs')}
                            {...breadcrumbs}
                            theme={theme}
                            qa={qaAttributes.breadcrumbs}
                        />
                    )}
                    <div
                        className={b('content', {
                            ['vertical-offset']: verticalOffset,
                        })}
                        data-qa={qaAttributes.contentWrapper}
                    >
                        {overtitle && (
                            <div
                                className={b('content-overtitle', {theme})}
                                data-qa={qaAttributes.contentOvertitle}
                            >
                                {typeof overtitle === 'string' ? (
                                    <YFMWrapper
                                        tagName="span"
                                        content={overtitle}
                                        modifiers={{
                                            constructor: true,
                                            constructorTheme: theme,
                                        }}
                                    />
                                ) : (
                                    overtitle
                                )}
                            </div>
                        )}
                        <Content
                            size="xl"
                            colSizes={{all: 12}}
                            {...contentProps}
                            buttons={buttonProps}
                            theme={contentTheme}
                            qa={qaAttributes.content}
                        />
                    </div>
                    {media && (
                        <div className={b('media')} data-qa={qaAttributes.mediaWrapper}>
                            <div className={b('media-container')} ref={mediaContainerRef}>
                                <Media
                                    className={b('media-container-content', {
                                        ['round-corners']: media.roundCorners ?? true,
                                        vertical: isDesktop && isMediaVertical,
                                    })}
                                    {...media}
                                    disablePlayerAutoSizing
                                    onIntrinsicSizeChange={onMediaIntrinsicSizeChange}
                                    qa={qaAttributes.mediaContainerContent}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Grid>
        </header>
    );
};

export default Hero;
