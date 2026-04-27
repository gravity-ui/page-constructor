import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../.storybook/utils';
import {PageConstructor, PageConstructorProvider} from '../containers/PageConstructor';
import {gravityBlocksExtension} from '../gravity-blocks/extensions';
import {CustomConfig, NavigationData, PageContent} from '../models';

import cardLayoutData from '../blocks/CardLayout/__stories__/data.json';
import extendedFeaturesData from '../blocks/ExtendedFeatures/__stories__/data.json';
import headerSliderData from '../blocks/HeaderSlider/__stories__/data.json';
import promoFeaturesData from '../blocks/PromoFeaturesBlock/__stories__/data.json';
import sliderData from '../blocks/Slider/__stories__/data.json';
import navData from '../gravity-blocks/navigation/__stories__/data.json';

export default {
    title: 'Lab/Tokenization/Blocks/FeaturesAndCards',
    component: PageConstructor,
} as Meta;

const Template: StoryFn<{navigation: NavigationData; custom?: CustomConfig}> = ({
    navigation,
    custom = {},
}) => (
    <PageConstructorProvider>
        <PageConstructor
            extensions={gravityBlocksExtension({
                globalDefaults: {
                    navigation,
                },
            })}
            custom={custom}
            content={
                {
                    blocks: [
                        // promo-features-block: default theme
                        blockTransform({
                            ...promoFeaturesData.common,
                            ...promoFeaturesData.defaultTheme.content,
                        }),
                        // promo-features-block: grey theme
                        blockTransform({
                            ...promoFeaturesData.common,
                            ...promoFeaturesData.greyTheme.content,
                        }),

                        // extended-features-block: default (3 cols)
                        blockTransform(extendedFeaturesData.default.content),
                        // extended-features-block: with labels
                        blockTransform({
                            type: 'extended-features-block',
                            ...extendedFeaturesData.withLabel.content,
                        }),
                        // extended-features-block: 2 per row
                        blockTransform({
                            type: 'extended-features-block',
                            ...extendedFeaturesData.colSizes.two,
                        }),
                        // extended-features-block: 4 per row
                        blockTransform({
                            type: 'extended-features-block',
                            ...extendedFeaturesData.colSizes.four,
                        }),

                        // card-layout-block: basic cards
                        {
                            ...cardLayoutData.default.content,
                            children: [
                                blockTransform(cardLayoutData.cards.basicCard),
                                blockTransform(cardLayoutData.cards.basicCard),
                                blockTransform(cardLayoutData.cards.basicCard),
                            ],
                        },
                        // card-layout-block: layout items with images
                        {
                            type: 'card-layout-block',
                            title: 'Card layout with layout items',
                            children: [
                                blockTransform(cardLayoutData.cards.layoutItem),
                                blockTransform(cardLayoutData.cards.layoutItem),
                                blockTransform(cardLayoutData.cards.layoutItem),
                            ],
                        },
                        // card-layout-block: background cards
                        {
                            type: 'card-layout-block',
                            title: 'Card layout with background cards',
                            children: [
                                blockTransform(cardLayoutData.cards.backgroundCard),
                                blockTransform(cardLayoutData.cards.backgroundCard),
                                blockTransform(cardLayoutData.cards.backgroundCard),
                            ],
                        },
                        // card-layout-block: price cards
                        {
                            type: 'card-layout-block',
                            title: 'Card layout with price cards',
                            children: [
                                blockTransform(cardLayoutData.cards.priceCard),
                                blockTransform(cardLayoutData.cards.priceCard),
                                blockTransform(cardLayoutData.cards.priceCard),
                            ],
                        },

                        // slider-block: basic cards
                        blockTransform(sliderData.default.content),
                        // slider-block: quote cards
                        blockTransform(sliderData.quoteCards.content),
                        // slider-block: banner cards (subtitle already HTML — no blockTransform)
                        sliderData.banners.content,

                        // header-slider-block: default
                        blockTransform({
                            type: 'header-slider-block',
                            ...headerSliderData.default,
                        }),
                        // header-slider-block: with different slide themes
                        blockTransform({
                            type: 'header-slider-block',
                            ...headerSliderData.withDifferentSlidesTheme,
                        }),
                    ],
                } as PageContent
            }
        />
    </PageConstructorProvider>
);

export const Default = Template.bind({});
Default.args = {
    navigation: {
        ...navData.navigation,
        header: {
            ...navData.navigation.header,
            withBorder: true,
            withBorderOnScroll: true,
        },
    } as NavigationData,
};
