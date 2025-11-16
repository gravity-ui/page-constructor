import {Meta, StoryFn, StoryObj} from '@storybook/react';

import {blockTransform, yfmTransform} from '../../../../.storybook/utils';
import {CustomBlock, TitleItemProps} from '../../../models';
import Title, {TitleProps} from '../Title';

import data from './data.json';

export default {
    title: 'Components/Title',
    component: Title,
    parameters: {
        layout: 'centered',
        controls: {expanded: true},
    },
} as Meta<TitleProps>;

const DefaultTemplate: StoryFn<TitleProps> = (args) => (
    <Title {...(blockTransform(args as unknown as CustomBlock) as TitleProps)} />
);

const SizesTemplate: StoryFn<TitleProps> = (args) => {
    const titleItemObjectProps = typeof args.title === 'object' ? args.title : {};
    return (
        <div>
            {Object.entries(data.sizes).map(([size, props]) => (
                <div key={size} style={{paddingBottom: '64px'}}>
                    <Title
                        {...args}
                        title={
                            {
                                ...props,
                                ...titleItemObjectProps,
                            } as TitleItemProps
                        }
                    />
                </div>
            ))}
        </div>
    );
};

const DefaultArgs = {
    ...data.default.content,
    subtitle: yfmTransform(data.default.content.subtitle),
};

export const Default: StoryObj<typeof Title> = DefaultTemplate.bind({});
export const TitleLink: StoryObj<typeof Title> = DefaultTemplate.bind({});
export const CustomTitle: StoryObj<typeof Title> = DefaultTemplate.bind({});
export const Sizes: StoryObj<typeof Title> = SizesTemplate.bind({});
export const SizesWithLinks: StoryObj<typeof Title> = SizesTemplate.bind({});
export const TitleWithoutDescription: StoryObj<typeof Title> = SizesTemplate.bind({});
export const WithCustomColSizes: StoryObj<typeof Title> = DefaultTemplate.bind({});

Default.args = {...DefaultArgs} as TitleProps;
TitleLink.args = {
    ...DefaultArgs,
    title: data.titleLink.content.title,
} as TitleProps;
CustomTitle.args = {
    ...DefaultArgs,
    title: data.customTitle.content.title,
} as TitleProps;
Sizes.args = {...DefaultArgs} as TitleProps;
SizesWithLinks.args = {
    ...DefaultArgs,
    title: data.titleLink.content.title,
} as TitleProps;
TitleWithoutDescription.args = {
    title: data.default.content.title,
} as TitleProps;
WithCustomColSizes.args = {
    ...DefaultArgs,
    colSizes: {all: 6, sm: 6, md: 4},
};
