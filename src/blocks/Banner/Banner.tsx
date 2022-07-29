import React from 'react';

import {block} from '../../utils';
import {BannerBlockProps} from '../../models';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import Banner from '../../components/Banner/Banner';

import './Banner.scss';

const b = block('banner-block');

export const BannerBlock: React.FC<BannerBlockProps> = (props) => {
    const {animated, ...bannerProps} = props;

    return (
        <AnimateBlock className={b()} animate={animated}>
            <Banner {...bannerProps} />
        </AnimateBlock>
    );
};

export default BannerBlock;
