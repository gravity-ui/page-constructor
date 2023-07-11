import React, {useContext} from 'react';

import {BackgroundImage, Button, HTML, RouterLink, YFMWrapper} from '../../components';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {BannerCardProps} from '../../models';
import {block, getThemedValue, hasBlockTag} from '../../utils';

import './BannerCard.scss';

const b = block('banner-card');

export const BannerCard = (props: BannerCardProps) => {
    const {
        title,
        subtitle,
        button: {url, text, target},
        color,
        theme: textTheme = 'light',
        image,
        disableCompress,
    } = props;
    const {themeValue: theme} = useContext(ThemeValueContext);
    const contentStyle: Record<string, string> = {};

    if (color) {
        contentStyle.backgroundColor = getThemedValue(color, theme);
    }

    return (
        <div className={b({theme: textTheme})}>
            <div className={b('content')} style={contentStyle}>
                <div className={b('info')}>
                    <div className={b('text')}>
                        <h2 className={b('title')}>
                            <HTML block={hasBlockTag(title)}>{title}</HTML>
                        </h2>
                        {subtitle && (
                            <YFMWrapper
                                className={b('subtitle')}
                                content={subtitle}
                                modifiers={{constructor: true}}
                            />
                        )}
                    </div>
                    <RouterLink href={url}>
                        <Button
                            className={b('button')}
                            theme="raised"
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
