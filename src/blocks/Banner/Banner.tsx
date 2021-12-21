import React from 'react';
import {HTML} from '@doc-tools/components';

import {block} from '../../utils';
import {BannerBlockProps} from '../../models';
import Button from '../../components/Button/Button';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';

import './Banner.scss';

const b = block('banner-block');

const BannerBlock: React.FC<BannerBlockProps> = (props) => {
    const {
        title,
        subtitle,
        button: {url, text, target},
        color,
        theme = 'light',
        image,
        disableCompress,
        animated,
    } = props;

    const contentStyle: Record<string, string> = {};

    if (color) {
        contentStyle.backgroundColor = color;
    }

    return (
        <AnimateBlock className={b({theme})} animate={animated}>
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
                                modifiers={{
                                    constructor: true,
                                    redefinitions: true,
                                    constructorThemeDark: theme === 'dark',
                                }}
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
                    src={image}
                    disableCompress={disableCompress}
                />
            </div>
        </AnimateBlock>
    );
};

export default BannerBlock;
