import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {ClassNameProps, TitleItemProps} from '../../../models';
import Title, {TitleProps} from '../Title';

import data from './data.json';

export default {
    component: Title,
    title: 'Components/Title',
} as Meta;

const DefaultTemplate: StoryFn<TitleProps & ClassNameProps> = (args) => <Title {...args} />;

const SizesTemplate: StoryFn<TitleProps & ClassNameProps> = (args) => {
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

export const Default = DefaultTemplate.bind({});
export const TitleLink = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});
export const Sizes = SizesTemplate.bind({});
export const SizesWithLinks = SizesTemplate.bind({});
export const TitleWithoutDescription = SizesTemplate.bind({});

Default.args = {
    ...DefaultArgs,
} as TitleProps;
TitleLink.args = {
    ...DefaultArgs,
    title: data.titleLink.content.title,
} as TitleProps;
CustomTitle.args = {
    ...DefaultArgs,
    title: data.customTitle.content.title,
} as TitleProps;
Sizes.args = {
    ...DefaultArgs,
} as TitleProps;
SizesWithLinks.args = {
    ...DefaultArgs,
    title: data.titleLink.content.title,
} as TitleProps;
TitleWithoutDescription.args = {
    title: data.default.content.title,
} as TitleProps;
