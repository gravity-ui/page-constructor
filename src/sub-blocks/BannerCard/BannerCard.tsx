import React from 'react';

import {BackgroundImage, Button, HTML, RouterLink, YFMWrapper} from '../../components';
import {useTheme} from '../../context/theme';
import {BannerCardProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import './BannerCard.scss';

const b = block('banner-card');

export const BannerCard = (props: BannerCardProps) => {
    const {
        title,
        subtitle,
        button,
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
                        <h2 className={b('title')}>
                            <HTML>{title}</HTML>
                        </h2>
                        {subtitle && (
                            <YFMWrapper
                                className={b('subtitle')}
                                content={subtitle}
                                modifiers={{constructor: true}}
                            />
                        )}
                    </div>
                    {button && (
                        <RouterLink href={button.url}>
                            <Button
                                className={b('button')}
                                theme={button.theme}
                                size="xl"
                                text={button.text}
                                url={button.url}
                                target={button.target}
                            />
                        </RouterLink>
                    )}
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
