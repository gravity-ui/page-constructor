import React, {useContext} from 'react';
import {HTML} from '@doc-tools/components';

import {block, getThemedValue} from '../../utils';
import {BannerProps} from '../../models';
import Button from '../../components/Button/Button';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';

import './Banner.scss';

const b = block('banner');

export const Banner: React.FC<BannerProps> = (props) => {
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
                    <Button
                        className={b('button')}
                        theme="raised"
                        size="xl"
                        text={text}
                        url={url}
                        target={target}
                    />
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

export default Banner;
