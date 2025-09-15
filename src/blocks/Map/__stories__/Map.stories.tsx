import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {scriptsSrc, ymapApiKeyForStorybook} from '../../../../.storybook/maps';
import {yfmTransform} from '../../../../.storybook/utils';
import {ApiKeyInput} from '../../../components/Map/__stories__/ApiKeyInput';
import {PageConstructor} from '../../../containers/PageConstructor';
import {MapType} from '../../../context/mapsContext/mapsContext';
import {MapProvider, gmapApiKeyIdInLS} from '../../../context/mapsContext/mapsProvider';
import {ButtonProps, LinkProps, MapBlockModel, MapBlockProps} from '../../../models';
import MapBlock from '../Map';

import data from './data.json';

export default {
    title: 'Blocks/Map',
    component: MapBlock,
    args: {
        largeMedia: false,
        mediaOnly: false,
        size: 'l',
    },
} as Meta;

const DefaultTemplate: StoryFn<MapBlockModel> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <PageConstructor
            content={{
                blocks: [
                    {
                        ...args,
                        additionalInfo: yfmTransform(data.common.additionalInfo),
                        map: data.ymap,
                    },
                    {
                        ...args,
                        links: data.common.links as LinkProps[],
                        map: {
                            ...data.ymap,
                            id: 'common-places-2',
                        },
                    },
                    {
                        ...args,
                        buttons: data.common.buttons as ButtonProps[],
                        map: {
                            ...data.ymap,
                            id: 'common-places-3',
                        },
                    },
                ],
            }}
        />
    </MapProvider>
);

const SizeTemplate: StoryFn<MapBlockModel> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <PageConstructor
            content={{
                blocks: [
                    {
                        ...args,
                        title: data.size.defaultMediaTitle,
                        map: data.ymap,
                    },
                    {
                        ...args,
                        largeMedia: true,
                        title: data.size.largeMediaTitle,
                        map: {
                            ...data.ymap,
                            id: 'common-places-2',
                        },
                    },
                    {
                        ...args,
                        mediaOnly: true,
                        description: undefined,
                        title: data.size.mediaOnlyTitle,
                        map: {
                            ...data.ymap,
                            id: 'common-places-3',
                        },
                    },
                ],
            }}
        />
    </MapProvider>
);

const DirectionTemplate: StoryFn<MapBlockModel> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <PageConstructor
            content={{
                blocks: [
                    {
                        ...args,
                        title: data.direction.defaultDirectionTitle,
                        map: data.ymap,
                    },
                    {
                        ...args,
                        title: data.direction.ReverseDirectionTitle,
                        direction: 'media-content',
                        map: {
                            ...data.ymap,
                            id: 'common-places-2',
                        },
                    },
                    {
                        ...args,
                        title: data.direction.ReverseDirectionTitle,
                        mobileDirection: 'media-content',
                        map: {
                            ...data.ymap,
                            id: 'common-places-3',
                        },
                    },
                ],
            }}
        />
    </MapProvider>
);

const GMAP_API_KEY = process.env.STORYBOOK_GMAP_API_KEY;

const MapsTypesTemplate: StoryFn<MapBlockModel> = (args) => (
    <React.Fragment>
        <MapProvider
            scriptSrc={scriptsSrc[MapType.Yandex]}
            apiKey={ymapApiKeyForStorybook}
            type={MapType.Yandex}
        >
            <PageConstructor
                content={{
                    blocks: [
                        {
                            ...args,
                            title: data.direction.defaultDirectionTitle,
                            map: data.ymap,
                        },
                    ],
                }}
            />
        </MapProvider>
        <MapProvider
            scriptSrc={scriptsSrc[MapType.Google]}
            type={MapType.Google}
            apiKey={GMAP_API_KEY}
        >
            {!GMAP_API_KEY && (
                <div style={{maxWidth: '500px', marginLeft: '40px'}}>
                    <ApiKeyInput id={gmapApiKeyIdInLS} />
                </div>
            )}
            <PageConstructor
                content={{
                    blocks: [
                        {
                            ...args,
                            title: data.direction.ReverseDirectionTitle,
                            direction: 'media-content',
                            map: data.gmap,
                        },
                    ],
                }}
            />
        </MapProvider>
    </React.Fragment>
);

const EnhancedTitleTemplate: StoryFn<MapBlockModel> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <PageConstructor
            content={{
                blocks: [
                    {
                        ...args,
                        ...data.enhancedTitle.largeClickable,
                        map: data.ymap,
                    },
                    {
                        ...args,
                        ...data.enhancedTitle.interactiveWithIcon,
                        title: {
                            ...data.enhancedTitle.interactiveWithIcon.title,
                            onClick: () => alert('Map title clicked!'),
                        },
                        map: {
                            ...data.ymap,
                            id: 'interactive-title-map',
                        },
                    },
                ],
            }}
        />
    </MapProvider>
);

export const Default = DefaultTemplate.bind({});
export const Size = SizeTemplate.bind({});
export const Direction = DirectionTemplate.bind({});
export const MapsTypes = MapsTypesTemplate.bind({});
export const EnhancedTitle = EnhancedTitleTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    title: data.common.title,
    description: yfmTransform(data.common.description),
    map: data.ymap,
};

Default.args = DefaultArgs as MapBlockProps;

Size.args = DefaultArgs as MapBlockProps;
Direction.args = DefaultArgs as MapBlockProps;

MapsTypes.args = DefaultArgs as MapBlockProps;

EnhancedTitle.args = {
    ...DefaultArgs,
    ...data.enhancedTitle.largeClickable,
} as MapBlockProps;
