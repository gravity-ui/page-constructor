import React from 'react';

import {block} from '../../utils';
import {BannerBlockProps, ReactFCC} from '../../models';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {BannerCard} from '../../sub-blocks';

import './Banner.scss';

const b = block('banner-block');

export const BannerBlock: ReactFCC<BannerBlockProps> = (props) => {
    const {animated, ...bannerProps} = props;

    return (
        <AnimateBlock className={b()} animate={animated}>
            <BannerCard {...bannerProps} />
        </AnimateBlock>
    );
};

export default BannerBlock;
