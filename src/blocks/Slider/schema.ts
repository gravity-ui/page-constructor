import {
    AnimatableProps,
    BlockBaseProps,
    BlockHeaderProps,
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
        /**
         * @deprecated
         */
        minCount: {
            type: 'number',
        },
        /**
         * @deprecated Will be moved to params
         */
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
            contentType: 'text',
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
            ...BlockHeaderProps,
        },
    },
};
