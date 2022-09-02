import React from 'react';
import block from 'bem-cn-lite';
import {Content, ContentBlockProps, Image, NewMetrikaGoal} from '@yandex-data-ui/page-constructor';

import {BlogWrapper, PaddingSize} from 'components/BlogWrapper/BlogWrapper';

import {getBlogElementMetrika, checkContentDefaults} from 'utils/blog';

import {BlogMetrikaGoalIds} from '../constants';

import './BlogBanner.scss';

const b = block('BlogBannerBlock');

export type BannerBlockProps = ContentBlockProps & {
    background?: string;
    color?: string;
    image?: string;
    imageSize?: 's' | 'm';
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const BlogBannerBlock: React.FC<BannerBlockProps> = ({
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
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom} className={b('content')}>
            <div className={b('banner-content')} style={contentStyle} data-qa="blog-banner-content">
                <div className={b('info')}>
                    <Content {...contentData} />
                </div>
                {image && (
                    <div className={b('image-container', {['image-size']: imageSize})}>
                        <Image className={b('image')} src={image} />
                    </div>
                )}
            </div>
        </BlogWrapper>
    );
};
