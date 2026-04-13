import * as React from 'react';

import {HeaderBreadcrumbs, Media, YFMWrapper} from '../../components';
import {BREAKPOINTS} from '../../constants';
import {useTheme} from '../../context/theme';
import {useWindowWidth} from '../../context/windowWidthContext';
import {Grid} from '../../grid';
import {ButtonProps, HeroBlockProps, Theme} from '../../models';
import {Content} from '../../sub-blocks';
import {block, getThemedValue} from '../../utils';

import {useContainerAspectRatio} from './utils';

import './Hero.scss';

const b = block('hero-block');

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

    const [mediaAspectRatio, setMediaAspectRatio] = React.useState<number>(Infinity);

    const {aspectRatio: mediaContainerAspectRatio, ref: mediaContainerRef} =
        useContainerAspectRatio();

    const isDesktop = useWindowWidth() > BREAKPOINTS.md;
    const isMediaVertical = mediaAspectRatio < mediaContainerAspectRatio;

    const contextTheme = useTheme();
    const theme = contentTheme === 'default' ? contextTheme : (contentTheme as Theme);

    const background = getThemedValue(themedBackground, theme);
    const media = getThemedValue(themedMedia, theme);

    const buttonProps = React.useMemo<ButtonProps[] | undefined>(
        () =>
            buttons?.map((buttonThemed) => {
                const button = getThemedValue(buttonThemed, theme);

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
        <header className={b()}>
            {background && (
                <Media
                    className={b('background', {
                        ['full-width']: fullWidth,
                    })}
                    imageClassName={b('background-image')}
                    videoClassName={b('background-video')}
                    {...background}
                    isBackground
                />
            )}
            <Grid>
                <div className={b('wrapper')}>
                    {breadcrumbs && (
                        <HeaderBreadcrumbs
                            className={b('breadcrumbs')}
                            {...breadcrumbs}
                            theme={theme}
                        />
                    )}
                    <div
                        className={b('content', {
                            ['vertical-offset']: verticalOffset,
                            ['no-media']: !media,
                        })}
                    >
                        {overtitle && (
                            <div className={b('content-overtitle', {theme})}>
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
                        />
                    </div>
                    {media && (
                        <div className={b('media')}>
                            <div className={b('media-container')} ref={mediaContainerRef}>
                                <Media
                                    className={b('media-container-content', {
                                        ['round-corners']: media.roundCorners ?? true,
                                        vertical: isDesktop && isMediaVertical,
                                    })}
                                    {...media}
                                    disablePlayerAutoSizing
                                    onIntrinsicSizeChange={onMediaIntrinsicSizeChange}
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
