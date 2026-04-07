import * as React from 'react';

import {HeaderBreadcrumbs, Media, YFMWrapper} from '../../components';
import {useTheme} from '../../context/theme';
import {Grid} from '../../grid';
import {ButtonProps, HeroBlockProps, Theme} from '../../models';
import {Content} from '../../sub-blocks';
import {block, getThemedValue} from '../../utils';

import './Hero.scss';

const b = block('hero-block');

const HeroBlock = (props: HeroBlockProps) => {
    const {
        breadcrumbs,
        overtitle,
        title,
        text,
        buttons,
        media: themedMedia,
        fullWidth,
        verticalOffset,
        theme: propsTheme,
        background: themedBackground,
    } = props;

    const contextTheme = useTheme();
    const theme = propsTheme || contextTheme || Theme.Light;

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
            <Grid containerClass={b('wrapper')}>
                {breadcrumbs && (
                    <HeaderBreadcrumbs
                        className={b('breadcrumbs')}
                        {...breadcrumbs}
                        theme={theme}
                    />
                )}
                <div
                    className={b('content', {
                        ['vertical-offset']: verticalOffset || 'm',
                        ['no-media']: !media,
                    })}
                >
                    <div className={b('content-overtitle', {theme})}>
                        {overtitle && typeof overtitle === 'string' ? (
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
                    <Content
                        size="xl"
                        colSizes={{all: 12}}
                        title={title}
                        text={text}
                        buttons={buttonProps}
                        theme={theme}
                    />
                </div>

                {media && (
                    <div className={b('media')}>
                        <Media
                            className={b('media-content', {
                                ['round-corners']: media.roundCorners ?? true,
                            })}
                            {...media}
                        />
                    </div>
                )}
            </Grid>
        </header>
    );
};

export default HeroBlock;
