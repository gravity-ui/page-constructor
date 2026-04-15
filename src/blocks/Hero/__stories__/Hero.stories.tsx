import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {HeroBlockModel, HeroBlockProps, Theme as ThemeColor} from '../../../models';
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
        'media.roundCorners': {
            control: 'boolean',
        },
    },
} as Meta;

type WithRoundCornersArgs<T> = T & {
    'media.roundCorners'?: boolean;
};
const injectRoundCorners = ({
    'media.roundCorners': roundCorners,
    ...args
}: WithRoundCornersArgs<HeroBlockModel>): HeroBlockModel => {
    const {media, ...restArgs} = args;

    if (!media) {
        return args;
    }

    // @ts-expect-error
    const {[ThemeColor.Light]: light, [ThemeColor.Dark]: dark, ...restMedia} = media;

    const result: HeroBlockModel = {...restArgs};
    let resultMedia = {roundCorners, ...restMedia};

    if (light) {
        resultMedia = {
            ...resultMedia,
            // @ts-expect-error
            [ThemeColor.Light]: {
                roundCorners,
                ...light,
            },
        };
    }

    if (dark) {
        resultMedia = {
            ...resultMedia,
            // @ts-expect-error
            [ThemeColor.Dark]: {
                roundCorners,
                ...dark,
            },
        };
    }

    return {
        ...result,
        media: resultMedia,
    };
};

const DefaultTemplate: StoryFn<WithRoundCornersArgs<HeroBlockModel>> = (args) => (
    <Hero {...(blockTransform(injectRoundCorners(args)) as HeroBlockProps)} />
);

type VariantsTemplateModel = Record<number, HeroBlockModel>;
const VariantsTemplate: StoryFn<VariantsTemplateModel> = (args) => (
    <React.Fragment>
        {Object.values(args).map((variant, index) => (
            <div key={index} style={{marginBottom: '120px'}}>
                <Hero {...(blockTransform(variant) as HeroBlockProps)} />
            </div>
        ))}
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const Breadcrumbs = DefaultTemplate.bind({});
export const ContentList = DefaultTemplate.bind({});
export const Background = VariantsTemplate.bind({});
export const RoundCorners = VariantsTemplate.bind({});
export const VerticalOffset = VariantsTemplate.bind({});
export const Theme = VariantsTemplate.bind({});
export const Video = VariantsTemplate.bind({});
export const MediaFit = VariantsTemplate.bind({});

Default.args = data.default as HeroBlockModel;

Breadcrumbs.args = {
    ...data.default,
    ...data.breadcrumbs,
} as HeroBlockModel;

ContentList.args = {
    ...data.default,
    ...data.contentList,
} as HeroBlockModel;

Background.args = [
    data.backgroundVariants.color,
    data.backgroundVariants.fullWidth,
    data.backgroundVariants.image,
    data.backgroundVariants.imageFullWidth,
].map((variant) => ({
    ...data.default,
    ...variant,
})) as VariantsTemplateModel;
Background.parameters = {
    controls: {
        include: Object.keys(Background.args),
    },
};

RoundCorners.args = [data.roundCornersVariants.true, data.roundCornersVariants.false].map(
    (variant) => ({
        ...data.default,
        ...variant,
    }),
) as VariantsTemplateModel;
RoundCorners.parameters = {
    controls: {
        include: Object.keys(RoundCorners.args),
    },
};

VerticalOffset.args = [
    data.verticalOffsetVariants.s,
    data.verticalOffsetVariants.m,
    data.verticalOffsetVariants.l,
    data.verticalOffsetVariants.xl,
].map((variant) => ({
    ...data.default,
    ...variant,
})) as VariantsTemplateModel;
VerticalOffset.parameters = {
    controls: {
        include: Object.keys(VerticalOffset.args),
    },
};

Theme.args = [data.themeVariants.light, data.themeVariants.dark].map((variant) => ({
    ...data.default,
    ...variant,
})) as VariantsTemplateModel;
Theme.parameters = {
    controls: {
        include: Object.keys(Theme.args),
    },
};

Video.args = [
    data.videoVariants.media,
    data.videoVariants.mediaIframe,
    data.videoVariants.background,
    data.videoVariants.backgroundFullWidth,
].map((variant) => ({
    ...data.default,
    ...variant,
})) as VariantsTemplateModel;
Video.parameters = {
    controls: {
        include: Object.keys(Video.args),
    },
};

MediaFit.args = [
    data.mediaFitVariants.wide,
    data.mediaFitVariants.square,
    data.mediaFitVariants.tall,
].map((variant) => ({
    ...data.default,
    ...variant,
})) as VariantsTemplateModel;
MediaFit.parameters = {
    controls: {
        include: Object.keys(MediaFit.args),
    },
};
