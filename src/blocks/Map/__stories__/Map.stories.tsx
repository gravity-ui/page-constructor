import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {scriptsSrc, ymapApiKeyForStorybook} from '../../../../.storybook/maps';
import {blockTransform} from '../../../../.storybook/utils';
import {ApiKeyInput} from '../../../components/Map/__stories__/ApiKeyInput';
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

const DefaultTemplate: StoryFn<MapBlockModel> = (args) => {
    const transformedArgs = blockTransform({
        ...args,
        additionalInfo: data.common.additionalInfo,
        map: data.ymap,
    }) as MapBlockProps;

    const transformedArgsCommonPlaces2 = blockTransform({
        ...args,
        links: data.common.links as LinkProps[],
        map: {
            ...data.ymap,
            id: 'common-places-2',
        },
    }) as MapBlockProps;

    const transformedArgsCommonPlaces3 = blockTransform({
        ...args,
        buttons: data.common.buttons as ButtonProps[],
        map: {
            ...data.ymap,
            id: 'common-places-3',
        },
    }) as MapBlockProps;
    return (
        <MapProvider
            scriptSrc={scriptsSrc[MapType.Yandex]}
            apiKey={ymapApiKeyForStorybook}
            type={MapType.Yandex}
        >
            <div style={{padding: '64px', display: 'flex', gap: 20, flexDirection: 'column'}}>
                <MapBlock {...transformedArgs} />
                <MapBlock {...transformedArgsCommonPlaces2} />
                <MapBlock {...transformedArgsCommonPlaces3} />
            </div>
        </MapProvider>
    );
};

const SizeTemplate: StoryFn<MapBlockModel> = (args) => {
    const transformedArgsDefaultMediaTitle = blockTransform({
        ...args,
        title: data.size.defaultMediaTitle,
        map: data.ymap,
    }) as MapBlockProps;

    const transformedArgsLargeMediaTitle = blockTransform({
        ...args,
        largeMedia: true,
        title: data.size.largeMediaTitle,
        map: {
            ...data.ymap,
            id: 'common-places-2',
        },
    }) as MapBlockProps;

    const transformedArgsMediaOnlyTitle = blockTransform({
        ...args,
        mediaOnly: true,
        description: undefined,
        title: data.size.mediaOnlyTitle,
        map: {
            ...data.ymap,
            id: 'common-places-3',
        },
    }) as MapBlockProps;

    return (
        <MapProvider
            scriptSrc={scriptsSrc[MapType.Yandex]}
            apiKey={ymapApiKeyForStorybook}
            type={MapType.Yandex}
        >
            <div style={{padding: '64px', display: 'flex', gap: 20, flexDirection: 'column'}}>
                <MapBlock {...transformedArgsDefaultMediaTitle} />
                <MapBlock {...transformedArgsLargeMediaTitle} />
                <MapBlock {...transformedArgsMediaOnlyTitle} />
            </div>
        </MapProvider>
    );
};

const DirectionTemplate: StoryFn<MapBlockModel> = (args) => {
    const transformedArgsDefaulDirection = blockTransform({
        ...args,
        title: data.direction.defaultDirectionTitle,
        map: data.ymap,
    }) as MapBlockProps;

    const transformedArgsReverseDirection = blockTransform({
        ...args,
        title: data.direction.ReverseDirectionTitle,
        direction: 'media-content',
        map: {
            ...data.ymap,
            id: 'common-places-2',
        },
    }) as MapBlockProps;

    const transformedArgsReverseDirection2 = blockTransform({
        ...args,
        title: data.direction.ReverseDirectionTitle,
        mobileDirection: 'media-content',
        map: {
            ...data.ymap,
            id: 'common-places-3',
        },
    }) as MapBlockProps;

    return (
        <MapProvider
            scriptSrc={scriptsSrc[MapType.Yandex]}
            apiKey={ymapApiKeyForStorybook}
            type={MapType.Yandex}
        >
            <div style={{padding: '64px', display: 'flex', gap: 20, flexDirection: 'column'}}>
                <MapBlock {...transformedArgsDefaulDirection} />
                <MapBlock {...transformedArgsReverseDirection} />
                <MapBlock {...transformedArgsReverseDirection2} />
            </div>
        </MapProvider>
    );
};

const GMAP_API_KEY = process.env.STORYBOOK_GMAP_API_KEY;

const MapsTypesTemplate: StoryFn<MapBlockModel> = (args) => {
    const transformedArgs = blockTransform({
        ...args,
        title: data.direction.defaultDirectionTitle,
        map: data.ymap,
    }) as MapBlockProps;

    const transformedArgs2 = blockTransform({
        ...args,
        title: data.direction.ReverseDirectionTitle,
        direction: 'media-content',
        map: data.gmap,
    }) as MapBlockProps;

    return (
        <React.Fragment>
            <MapProvider
                scriptSrc={scriptsSrc[MapType.Yandex]}
                apiKey={ymapApiKeyForStorybook}
                type={MapType.Yandex}
            >
                <MapBlock {...transformedArgs} />
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
                <MapBlock {...transformedArgs2} />
            </MapProvider>
        </React.Fragment>
    );
};

const EnhancedTitleTemplate: StoryFn<MapBlockModel> = (args) => {
    const transformedArgs = blockTransform({
        ...args,
        ...data.enhancedTitle.largeClickable,
        map: data.ymap,
    }) as MapBlockProps;
    const transformedArgsInteractive = blockTransform({
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
    }) as MapBlockProps;
    return (
        <MapProvider
            scriptSrc={scriptsSrc[MapType.Yandex]}
            apiKey={ymapApiKeyForStorybook}
            type={MapType.Yandex}
        >
            <div style={{padding: '64px', display: 'flex', gap: 20, flexDirection: 'column'}}>
                <MapBlock {...transformedArgs} />
                <MapBlock {...transformedArgsInteractive} />
            </div>
        </MapProvider>
    );
};

export const Default = DefaultTemplate.bind({});
export const Size = SizeTemplate.bind({});
export const Direction = DirectionTemplate.bind({});
export const MapsTypes = MapsTypesTemplate.bind({});
export const EnhancedTitle = EnhancedTitleTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    title: data.common.title,
    description: data.common.description,
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
