import React, {useContext} from 'react';
import {HTML} from '@doc-tools/components';

import {block, getThemedValue} from '../../utils';
import {BannerBlockProps} from '../../models';
import Button from '../../components/Button/Button';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';

import './Banner.scss';

const b = block('banner-block');

export const BannerBlock: React.FC<BannerBlockProps> = (props) => {
    const {
        title,
        subtitle,
        button: {url, text, target},
        color,
        theme: textTheme = 'light',
        image,
        disableCompress,
        animated,
    } = props;
    const {themeValue: theme} = useContext(ThemeValueContext);
    const contentStyle: Record<string, string> = {};

    if (color) {
        contentStyle.backgroundColor = getThemedValue(color, theme);
    }

    return (
        <AnimateBlock className={b({theme: textTheme})} animate={animated}>
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
        </AnimateBlock>
    );
};

export default BannerBlock;
