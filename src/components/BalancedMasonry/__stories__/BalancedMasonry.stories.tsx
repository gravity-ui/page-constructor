import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {BREAKPOINTS} from '../../../constants';
import {COMPONENTS} from '../../../demo/constants';
import CardBase from '../../CardBase/CardBase';
import BalancedMasonry, {BalancedMasonryProps} from '../BalancedMasonry';

import data from './data.json';

import './BalancedMansonry.stories.scss';

export default {
    component: BalancedMasonry,
    title: `${COMPONENTS}/BalancedMasonry`,
} as Meta;

const DefaultTemplate: Story<BalancedMasonryProps> = (args) => <BalancedMasonry {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    className: 'balanced-masonry-stories__class-name',
    columnClassName: 'balanced-masonry-stories__column-class-name',
    children: [
        <CardBase key="1" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[0]}</CardBase.Content>
        </CardBase>,
        <CardBase key="2" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[1]}</CardBase.Content>
        </CardBase>,
        <CardBase key="3" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[2]}</CardBase.Content>
        </CardBase>,
        <CardBase key="4" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[3]}</CardBase.Content>
        </CardBase>,
        <CardBase key="5" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[4]}</CardBase.Content>
        </CardBase>,
        <CardBase key="6" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                {data.default.content.children[5]}
                на дашбордах.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="7" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[6]}</CardBase.Content>
        </CardBase>,
        <CardBase key="8" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[7]}</CardBase.Content>
        </CardBase>,
        <CardBase key="9" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[8]}</CardBase.Content>
        </CardBase>,
        <CardBase key="10" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[9]}</CardBase.Content>
        </CardBase>,
        <CardBase key="11" className="balanced-masonry-stories__card-base">
            <CardBase.Content>{data.default.content.children[10]}</CardBase.Content>
        </CardBase>,
    ],
    breakpointCols: {
        [BREAKPOINTS.lg]: 3,
        [BREAKPOINTS.md]: 2,
        [BREAKPOINTS.sm]: 1,
    },
};
