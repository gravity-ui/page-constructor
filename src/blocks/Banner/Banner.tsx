import React from 'react';

import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {BannerBlockProps} from '../../models';
import {BannerCard} from '../../sub-blocks';
import {block} from '../../utils';

import './Banner.scss';

const b = block('banner-block');

export const BannerBlock = (props: BannerBlockProps) => {
    const {animated, className, ...bannerProps} = props;

    const divClassName = b(null, className);

    return (
        <AnimateBlock className={divClassName} animate={animated}>
            <BannerCard {...bannerProps} />
        </AnimateBlock>
    );
};

export default BannerBlock;
