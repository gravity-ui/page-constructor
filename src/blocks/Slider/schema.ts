import {
    BlockBaseProps,
    TitleProps,
    AnimatableProps,
    ChildrenCardsProps,
    sliderSizesObject,
    textSize,
} from '../../schema/validators/common';

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
        // deprecated
        serviceId: {type: 'number'},
        params: {
            type: 'object',
            patternProperties: {
                '.*': {
                    type: ['string', 'number', 'boolean'],
                },
            },
        },
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
