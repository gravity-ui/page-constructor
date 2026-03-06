import {Meta, StoryFn} from '@storybook/react';

import {scriptsSrc, ymapApiKeyForStorybook} from '../../.storybook/maps';
import {blockTransform} from '../../.storybook/utils';
import {PageConstructor} from '../containers/PageConstructor';
import {MapType} from '../context/mapsContext/mapsContext';
import {MapProvider} from '../context/mapsContext/mapsProvider';
import {CustomConfig, NavigationData, PageContent} from '../models';
import {CustomButton} from '../navigation/__stories__/CustomButton/CustomButton';

import filterData from '../blocks/FilterBlock/__stories__/data.json';
import formData from '../blocks/Form/__stories__/data.json';
import iconsData from '../blocks/Icons/__stories__/data.json';
import mapData from '../blocks/Map/__stories__/data.json';
import shareData from '../blocks/Share/__stories__/data.json';
import navData from '../navigation/__stories__/data.json';

export default {
    title: 'Lab/Tokenization/Blocks/InteractiveAndForms',
    component: PageConstructor,
} as Meta;

const Template: StoryFn<{navigation: NavigationData; custom?: CustomConfig}> = ({
    navigation,
    custom = {},
}) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <PageConstructor
            navigation={navigation}
            custom={custom}
            content={
                {
                    blocks: [
                        // form-block: hubspot form
                        blockTransform(formData.default),
                        // form-block: with background color
                        blockTransform({...formData.default, ...formData.withBackground}),
                        // form-block: with background image
                        blockTransform({...formData.default, ...formData.withBackgroundImage}),
                        // form-block: yandex form
                        blockTransform(formData.yandexForm),

                        // filter-block: with tag filtering and layout items
                        blockTransform(filterData.default),

                        // icons-block: minimal (no title)
                        blockTransform(iconsData.default.content),
                        // icons-block: with title and description
                        blockTransform(iconsData.withDescription.content),

                        // share-block: default (no title)
                        blockTransform(shareData.default.content),
                        // share-block: with custom title
                        blockTransform(shareData.customTitle.content),

                        // map-block: default with yandex map
                        blockTransform({
                            type: 'map-block',
                            title: mapData.common.title,
                            description: mapData.common.description,
                            map: mapData.ymap,
                        }),
                        // map-block: with additional info and links
                        blockTransform({
                            type: 'map-block',
                            title: mapData.common.title,
                            description: mapData.common.description,
                            additionalInfo: mapData.common.additionalInfo,
                            links: mapData.common.links,
                            map: {...mapData.ymap, id: 'common-places-2'},
                        }),
                        // map-block: with buttons
                        blockTransform({
                            type: 'map-block',
                            title: mapData.common.title,
                            description: mapData.common.description,
                            buttons: mapData.common.buttons,
                            map: {...mapData.ymap, id: 'common-places-3'},
                        }),
                    ],
                } as PageContent
            }
        />
    </MapProvider>
);

export const Default = Template.bind({});
Default.args = {
    custom: {
        navigation: {
            'custom-item': CustomButton,
        },
    },
    navigation: {
        ...navData.navigation,
        header: {
            ...navData.navigation.header,
            customMobileHeaderItems: [{type: 'custom-item'}],
        },
    } as unknown as NavigationData,
};
