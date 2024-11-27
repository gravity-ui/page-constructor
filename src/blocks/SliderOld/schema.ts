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
                    oneOf: [
                        {
                            type: ['string', 'number', 'boolean'],
                        },
                        {
                            type: 'object',
                            additionalProperties: true,
                        },
                        {
                            type: 'array',
                        },
                    ],
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

export const SliderOldProps = {
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

/** @deprecated */
export const SliderOldBlock = {
    'slider-old-block': {
        additionalProperties: false,
        required: [],
        properties: {
            ...BlockBaseProps,
            ...AnimatableProps,
            ...SliderOldProps,
            ...BlockHeaderProps,
        },
    },
};
