import {Meta, StoryFn} from '@storybook/react';

import {BREAKPOINTS} from '../../../constants';
import CardBase from '../../CardBase/CardBase';
import BalancedMasonry, {BalancedMasonryProps} from '../BalancedMasonry';

import data from './data.json';

import './BalancedMansonry.stories.scss';

export default {
    component: BalancedMasonry,
    title: 'Components/BalancedMasonry',
} as Meta;

const DefaultTemplate: StoryFn<BalancedMasonryProps> = ({children, ...args}) => (
    <BalancedMasonry {...args}>
        {children.map((text, index) => (
            <CardBase key={index} className="balanced-masonry-stories__card-base">
                <CardBase.Content>{text}</CardBase.Content>
            </CardBase>
        ))}
    </BalancedMasonry>
);

export const Default = DefaultTemplate.bind({});
export const DifferentBreakpoints = DefaultTemplate.bind({});

Default.args = {
    className: 'balanced-masonry-stories__class-name',
    columnClassName: 'balanced-masonry-stories__column-class-name',
    breakpointCols: {
        [BREAKPOINTS.xs]: 1,
        [BREAKPOINTS.sm]: 2,
        [BREAKPOINTS.md]: 2,
        [BREAKPOINTS.lg]: 3,
        [BREAKPOINTS.xl]: 3,
    },
    children: data.default.content.children,
};

DifferentBreakpoints.args = {
    className: 'balanced-masonry-stories__class-name',
    columnClassName: 'balanced-masonry-stories__column-class-name',
    breakpointCols: {
        [BREAKPOINTS.xs]: 1,
        [BREAKPOINTS.sm]: 1,
        [BREAKPOINTS.md]: 3,
        [BREAKPOINTS.lg]: 4,
        [BREAKPOINTS.xl]: 5,
    },
    children: data.default.content.children,
};
