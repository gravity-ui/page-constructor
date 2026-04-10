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
        theme: {
            control: 'radio',
            options: ['default', 'light', 'dark'],
        },
        list: {
            control: 'object',
        },
        additionalInfo: {
            control: 'text',
        },
        links: {
            control: 'object',
        },
        buttons: {
            control: 'object',
        },
        media: {
            control: 'object',
        },
        'media.roundCorners': {
            control: 'boolean',
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

type VariantsTemplateModel = WithRoundCornersArgs<
    HeroBlockModel & {
        variants: Partial<HeroBlockModel>[];
    }
>;
const VariantsTemplate: StoryFn<VariantsTemplateModel> = ({
    variants,
    'media.roundCorners': roundCorners,
    ...args
}) => (
    <React.Fragment>
        {variants.map((variant, index) => (
            <div key={index} style={{marginBottom: '120px'}}>
                <Hero
                    {...(blockTransform(
                        injectRoundCorners({
                            ...args,
                            ...variant,
                            'media.roundCorners': roundCorners,
                        }),
                    ) as HeroBlockProps)}
                />
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

Background.args = {
    ...data.default,
    variants: [
        data.backgroundVariants.color,
        data.backgroundVariants.fullWidth,
        data.backgroundVariants.image,
        data.backgroundVariants.imageFullWidth,
    ],
} as VariantsTemplateModel;
Background.parameters = {
    controls: {
        exclude: ['background'],
    },
};

RoundCorners.args = {
    ...data.default,
    variants: [data.roundCornersVariants.true, data.roundCornersVariants.false],
} as VariantsTemplateModel;
RoundCorners.parameters = {
    controls: {
        exclude: ['media.roundCorners'],
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

Theme.args = {
    ...data.default,
    variants: [data.themeVariants.light, data.themeVariants.dark],
} as VariantsTemplateModel;
Theme.parameters = {
    controls: {
        exclude: ['theme'],
    },
};

Video.args = {
    ...data.default,
    variants: [
        data.videoVariants.media,
        data.videoVariants.mediaIframe,
        data.videoVariants.background,
        data.videoVariants.backgroundFullWidth,
    ],
} as VariantsTemplateModel;
Video.parameters = {
    controls: {
        exclude: ['media', 'background'],
    },
};

MediaFit.args = {
    ...data.default,
    variants: [
        data.mediaFitVariants.wide,
        data.mediaFitVariants.square,
        data.mediaFitVariants.tall,
    ],
} as VariantsTemplateModel;
