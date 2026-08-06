import {blockTransform} from '../../.storybook/utils';
import {ConstructorBlock, PageContent} from '../models';

import bannerData from '../blocks/Banner/__stories__/data.json';
import companiesData from '../blocks/Companies/__stories__/data.json';
import promoFeaturesData from '../blocks/PromoFeaturesBlock/__stories__/data.json';

export const createTokenizationLandingContent = (headerBlock: ConstructorBlock): PageContent => ({
    blocks: [
        blockTransform(headerBlock),
        blockTransform({
            ...promoFeaturesData.common,
            ...promoFeaturesData.defaultTheme.content,
        }),
        blockTransform(companiesData.withDescription.content),
        blockTransform(bannerData.default.content),
    ],
});
