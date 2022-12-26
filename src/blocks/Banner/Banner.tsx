import React from 'react';
import {Content, Image, NewMetrikaGoal} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';

import {getBlogElementMetrika, updateContentSizes} from '../../utils/common';
import {block} from '../../utils/cn';

import {PaddingsDirections} from '../../models/paddings';
import {BannerProps} from '../../models/blocks';

import {BlogMetrikaGoalIds} from '../../constants';

import './Banner.scss';

const b = block('banner');

export const Banner: React.FC<BannerProps> = ({
    color,
    imageSize = 's',
    image,
    paddingTop,
    paddingBottom,
    ...content
}) => {
    const contentStyle: Record<string, string> = {};

    if (color) {
        contentStyle.backgroundColor = color;
    }

    const contentData = updateContentSizes(content);

    const metrikaGoal: NewMetrikaGoal = {
        name: BlogMetrikaGoalIds.bannerCommon,
        isCrossSite: true,
    };

    contentData.buttons?.forEach((button) => {
        button.metrikaGoals = getBlogElementMetrika(metrikaGoal, button.metrikaGoals);
    });

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            className={b('container')}
        >
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
