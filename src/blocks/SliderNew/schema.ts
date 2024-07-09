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
            // add loadable sources here if you use it in your project
            // enum: ['my-loadable-source-1', 'my-loadable-source-1'],
        },
        /**
         * @deprecated
         */
        minCount: {
            type: 'number',
        },
        params: {
            type: 'object',
            patternProperties: {
                '.*': {
                    type: ['string', 'number', 'boolean'],
                },
            },
        },
    },
    // remove it in your custom validator schema if you use loadable
    disabled: true,
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

export const SliderNewProps = {
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
    type: {
        type: 'string',
    },
    adaptive: {
        type: 'boolean',
    },
    arrowSize: {
        type: 'number',
    },
    animated: AnimatableProps,
    slidesToShow: sliderSizesObject,
    disclaimer: DisclaimerProps,
    loadable: LoadableProps,
    children: ChildrenCardsProps,
};

export const SliderNewBlock = {
    'slider-new-block': {
        additionalProperties: false,
        required: [],
        properties: {
            ...BlockBaseProps,
            ...AnimatableProps,
            ...SliderNewProps,
            ...BlockHeaderProps,
        },
    },
};
