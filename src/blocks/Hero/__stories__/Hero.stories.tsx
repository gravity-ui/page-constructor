import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {HeroBlockModel, HeroBlockProps} from '../../../models';
import Hero from '../Hero';

import data from './data.json';

export default {
    title: 'Blocks/Hero',
    component: Hero,
    parameters: {
        controls: {
            exclude: ['type'],
        },
    },
    argTypes: {
        breadcrumbs: {
            control: 'object',
        },
        overtitle: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
        text: {
            control: 'text',
        },
        buttons: {
            control: 'object',
        },
        media: {
            control: 'object',
        },
        fullWidth: {
            control: 'boolean',
        },
        verticalOffset: {
            control: 'radio',
            options: ['s', 'm', 'l', 'xl'],
        },
        background: {
            control: 'object',
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<HeroBlockModel> = (args) => (
    <Hero {...(blockTransform(args) as HeroBlockProps)} />
);

type VariantsTemplateModel = HeroBlockModel & {
    variants: Partial<HeroBlockModel>[];
};
const VariantsTemplate: StoryFn<VariantsTemplateModel> = ({variants, ...args}) => (
    <React.Fragment>
        {variants.map((variant, index) => (
            <div key={index} style={{marginBottom: '120px'}}>
                <Hero {...(blockTransform({...args, ...variant}) as HeroBlockProps)} />
            </div>
        ))}
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const Breadcrumbs = DefaultTemplate.bind({});
export const Background = VariantsTemplate.bind({});
export const VerticalOffset = VariantsTemplate.bind({});
export const Image = VariantsTemplate.bind({});
export const Video = VariantsTemplate.bind({});
export const Full = DefaultTemplate.bind({});

Default.args = data.default as HeroBlockModel;

Breadcrumbs.args = {
    ...data.default,
    ...data.breadcrumbs,
} as HeroBlockModel;

Background.args = {
    ...data.default,
    variants: [data.backgroundVariants.color, data.backgroundVariants.fullWidth],
} as VariantsTemplateModel;
Background.parameters = {
    controls: {
        exclude: ['background'],
    },
};

VerticalOffset.args = {
    ...data.default,
    ...data.backgroundVariants.color,
    variants: [
        data.verticalOffsetVariants.s,
        data.verticalOffsetVariants.m,
        data.verticalOffsetVariants.l,
        data.verticalOffsetVariants.xl,
    ],
} as VariantsTemplateModel;
VerticalOffset.parameters = {
    controls: {
        exclude: ['verticalOffset'],
    },
};

Image.args = {
    ...data.default,
    variants: [data.imageVariants.media, data.imageVariants.background],
} as VariantsTemplateModel;
Image.parameters = {
    controls: {
        exclude: ['media', 'background'],
    },
};

Video.args = {
    ...data.default,
    variants: [
        data.videoVariants.media,
        data.videoVariants.background,
        data.videoVariants.mediaIframe,
    ],
} as VariantsTemplateModel;
Video.parameters = {
    controls: {
        exclude: ['media', 'background'],
    },
};

Full.args = {
    ...data.default,
    ...data.breadcrumbs,
    ...data.full,
} as HeroBlockModel;
