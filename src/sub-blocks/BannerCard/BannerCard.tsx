import React from 'react';

import {BackgroundImage, Button, RouterLink, YFMWrapper} from '../../components';
import {useTheme} from '../../context/theme';
import {BannerCardProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import './BannerCard.scss';

const b = block('banner-card');

export const BannerCard = (props: BannerCardProps) => {
    const {
        title,
        subtitle,
        button: {url, text, target, theme: buttonTheme = 'raised'},
        color,
        theme: textTheme = 'light',
        image,
        disableCompress,
        mediaView = 'full',
    } = props;
    const theme = useTheme();
    const contentStyle: Record<string, string> = {};

    if (color) {
        contentStyle.backgroundColor = getThemedValue(color, theme);
    }

    return (
        <div className={b({theme: textTheme, ['media-view']: mediaView})}>
            <div className={b('content')} style={contentStyle}>
                <div className={b('info')}>
                    <div className={b('text')}>
                        <YFMWrapper
                            variant="h2"
                            contentClassName={b('title')}
                            content={title}
                            modifiers={{
                                constructor: true,
                            }}
                        />
                        {subtitle && (
                            <YFMWrapper
                                contentClassName={b('subtitle')}
                                content={subtitle}
                                modifiers={{constructor: true}}
                            />
                        )}
                    </div>
                    <RouterLink href={url}>
                        <Button
                            className={b('button')}
                            theme={buttonTheme}
                            size="xl"
                            text={text}
                            url={url}
                            target={target}
                        />
                    </RouterLink>
                </div>
                <BackgroundImage
                    className={b('image')}
                    src={getThemedValue(image, theme)}
                    disableCompress={disableCompress}
                />
            </div>
        </div>
    );
};

export default BannerCard;
