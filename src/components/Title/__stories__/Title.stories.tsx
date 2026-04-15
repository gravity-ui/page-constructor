import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {ClassNameProps, TitleItemProps} from '../../../models';
import Title, {TitleProps} from '../Title';

import data from './data.json';

type SizeWithSubtitleProps = TitleItemProps & {subtitle: string};

export default {
    component: Title,
    title: 'Components/Title',
} as Meta;

const DefaultTemplate: StoryFn<TitleProps & ClassNameProps> = (args) => {
    const transformedSubtitle = args.subtitle ? yfmTransform(args.subtitle) : undefined;

    return <Title {...args} subtitle={transformedSubtitle} />;
};

const SizesTemplate: StoryFn<Record<string, TitleItemProps>> = (args) => (
    <div>
        {Object.values(args).map((titleProps, index) => (
            <div key={index} style={{paddingBottom: '64px'}}>
                <Title title={titleProps as TitleItemProps} />
            </div>
        ))}
    </div>
);

const SizesWithSubtitleTemplate: StoryFn<Record<string, SizeWithSubtitleProps>> = (args) => (
    <div>
        {Object.values(args).map(({subtitle, ...titleProps}, index) => (
            <div key={index} style={{paddingBottom: '64px'}}>
                <Title
                    title={titleProps as TitleItemProps}
                    subtitle={subtitle ? yfmTransform(subtitle) : undefined}
                />
            </div>
        ))}
    </div>
);

const sizesWithLinks = Object.fromEntries(
    Object.entries(data.sizes).map(([size, props]) => [
        size,
        {
            ...props,
            url: 'https://example.com',
            urlTitle: 'Example website. Opens in a new window',
        },
    ]),
);

export const Default = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});
export const TitleLink = DefaultTemplate.bind({});
export const Sizes = SizesTemplate.bind({});
export const SizesWithLinks = SizesTemplate.bind({});
export const SizesWithSubtitle = SizesWithSubtitleTemplate.bind({});
export const TitleWithoutDescription = SizesTemplate.bind({});

Default.args = data.default as TitleProps;

CustomTitle.args = data.customTitle as TitleProps;

TitleLink.args = data.titleLink as TitleProps;

Sizes.args = data.sizes as Record<string, TitleItemProps>;
Sizes.parameters = {
    controls: {
        include: Object.keys(data.sizes),
    },
};

SizesWithLinks.args = sizesWithLinks as Record<string, TitleItemProps>;
SizesWithLinks.parameters = {
    controls: {
        include: Object.keys(sizesWithLinks),
    },
};

SizesWithSubtitle.args = data.sizesWithSubtitle as Record<string, SizeWithSubtitleProps>;
SizesWithSubtitle.parameters = {
    controls: {
        include: Object.keys(data.sizesWithSubtitle),
    },
};

TitleWithoutDescription.args = data.sizes as Record<string, TitleItemProps>;
TitleWithoutDescription.parameters = {
    controls: {
        include: Object.keys(data.sizes),
    },
};
