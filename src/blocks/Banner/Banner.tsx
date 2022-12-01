import React from 'react';
import {Content, ContentBlockProps, Image, NewMetrikaGoal} from '@gravity-ui/page-constructor';

import {Wrapper, PaddingSize} from '../../components/Wrapper/Wrapper';

import {getBlogElementMetrika, checkContentDefaults} from '../../utils/common';
import {block} from '../../utils/cn';

import {BlogMetrikaGoalIds} from '../../constants';

import './Banner.scss';

const b = block('banner');

export type BannerProps = ContentBlockProps & {
    background?: string;
    color?: string;
    image?: string;
    imageSize?: 's' | 'm';
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const Banner: React.FC<BannerProps> = ({
    color,
    imageSize = 's',
    image,
    paddingTop,
    paddingBottom,
    ...contentData
}) => {
    const contentStyle: Record<string, string> = {};

    if (color) {
        contentStyle.backgroundColor = color;
    }

    checkContentDefaults(contentData);

    const metrikaGoal: NewMetrikaGoal = {
        name: BlogMetrikaGoalIds.bannerCommon,
        isCrossSite: true,
    };

    contentData.buttons?.forEach((button) => {
        button.metrikaGoals = getBlogElementMetrika(metrikaGoal, button.metrikaGoals);
    });

    return (
        <Wrapper paddingTop={paddingTop} paddingBottom={paddingBottom} className={b('container')}>
            <div className={b('content')} style={contentStyle} data-qa="blog-banner-content">
                <div className={b('info')}>
                    <Content {...contentData} />
                </div>
                {image && (
                    <div className={b('image-container', {['image-size']: imageSize})}>
                        <Image className={b('image')} src={image} />
                    </div>
                )}
            </div>
        </Wrapper>
    );
};
