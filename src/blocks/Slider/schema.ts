import {BlockBaseProps, TitleProps} from '../../schema/v2/common';
import {
    AnimatableProps,
    ChildrenCardsProps,
    sliderSizesObject,
    textSize,
} from '../../schema/common';

const LoadableProps = {
    additionalProperties: false,
    required: ['source'],
    properties: {
        source: {
            type: 'string',
            enum: ['events', 'blog', 'services'],
        },
        minCount: {
            type: 'number', //deprecated
        },
        serviceId: {type: 'number'},
    },
};

const DisclaimerProps = {
    additionalProperties: false,
    required: ['text'],
    properties: {
        text: {
            type: 'string',
        },
        size: {
            type: 'string',
            enum: textSize,
        },
    },
};

export const SliderProps = {
    dots: {
        type: 'boolean',
    },
    arrows: {
        type: 'boolean',
    },
    description: {
        type: 'string',
    },
    title: TitleProps,
    randomOrder: {
        type: 'boolean',
    },
    autoplay: {
        type: 'number',
    },
    animated: AnimatableProps,
    slidesToShow: sliderSizesObject,
    disclaimer: DisclaimerProps,
    loadable: LoadableProps,
    children: ChildrenCardsProps,
};

export const SliderBlock = {
    'slider-block': {
        additionalProperties: false,
        required: [],
        properties: {
            ...BlockBaseProps,
            ...AnimatableProps,
            ...SliderProps,
        },
    },
};
