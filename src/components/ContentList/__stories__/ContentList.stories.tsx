import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {ContentListProps, CustomBlock} from '../../../models';
import ContentList from '../ContentList';

import data from './data.json';

const BACKGROUND_COLOR = '#313538';

export default {
    component: ContentList,
    title: 'Components/ContentList',
} as Meta;

const DefaultTemplate: StoryFn<ContentListProps> = (args) => (
    <div
        style={{
            padding: '16px',
            backgroundColor: args.theme === 'dark' ? BACKGROUND_COLOR : 'transparent',
        }}
    >
        <ContentList {...(blockTransform(args as unknown as CustomBlock) as ContentListProps)} />
    </div>
);

const VariousTemplate: StoryFn<Record<number, ContentListProps>> = (args) => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        {Object.values(args).map((item, index) => (
            <div
                key={index}
                style={{
                    padding: '8px',
                    backgroundColor: item.theme === 'dark' ? BACKGROUND_COLOR : 'transparent',
                }}
            >
                <ContentList
                    {...(blockTransform(item as unknown as CustomBlock) as ContentListProps)}
                />
            </div>
        ))}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const WithoutText = DefaultTemplate.bind({});
export const WithoutTitle = DefaultTemplate.bind({});
export const WithoutIcon = DefaultTemplate.bind({});
export const Sizes = VariousTemplate.bind({});
export const Themes = VariousTemplate.bind({});

Default.args = data.default as ContentListProps;

WithoutText.args = data.withoutText as ContentListProps;
WithoutText.parameters = {
    controls: {
        include: Object.keys(data.withoutText),
    },
};
WithoutTitle.args = data.withoutTitle as ContentListProps;
WithoutTitle.parameters = {
    controls: {
        include: Object.keys(data.withoutTitle),
    },
};
WithoutIcon.args = data.withoutIcon as ContentListProps;
WithoutIcon.parameters = {
    controls: {
        include: Object.keys(data.withoutIcon),
    },
};
Themes.args = data.themes as ContentListProps[];
Themes.parameters = {
    controls: {
        include: Object.keys(data.themes),
    },
};
Sizes.args = data.sizes as ContentListProps[];
Sizes.parameters = {
    controls: {
        include: Object.keys(data.sizes),
    },
};
