import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {scriptsSrc, ymapApiKeyForStorybook} from '../../../../.storybook/maps';
import {blockTransform} from '../../../../.storybook/utils';
import {ApiKeyInput} from '../../../components/Map/__stories__/ApiKeyInput';
import {MapType} from '../../../context/mapsContext/mapsContext';
import {MapProvider, gmapApiKeyIdInLS} from '../../../context/mapsContext/mapsProvider';
import {MapBlockModel, MapBlockProps} from '../../../models';
import MapBlock from '../Map';

import data from './data.json';

export default {
    title: 'Blocks/Map',
    component: MapBlock,
} as Meta;

const DefaultTemplate: StoryFn<MapBlockModel> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <div style={{padding: '64px'}}>
            <MapBlock {...(blockTransform(args) as MapBlockProps)} />
        </div>
    </MapProvider>
);

const ControlsTemplate: StoryFn<Record<string, MapBlockModel>> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <div style={{padding: '64px', display: 'flex', gap: 20, flexDirection: 'column'}}>
            {Object.entries(args)
                .map(([key, item]) => {
                    if (typeof item !== 'object' || item === null) {
                        return null;
                    }
                    return <MapBlock key={key} {...(blockTransform(item) as MapBlockProps)} />;
                })
                .filter(Boolean)}
        </div>
    </MapProvider>
);

const SizeTemplate: StoryFn<Record<string, MapBlockModel>> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <div style={{padding: '64px', display: 'flex', gap: 20, flexDirection: 'column'}}>
            {Object.entries(args)
                .map(([key, item]) => {
                    if (typeof item !== 'object' || item === null) {
                        return null;
                    }
                    return <MapBlock key={key} {...(blockTransform(item) as MapBlockProps)} />;
                })
                .filter(Boolean)}
        </div>
    </MapProvider>
);

const DirectionTemplate: StoryFn<Record<string, MapBlockModel>> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <div style={{padding: '64px', display: 'flex', gap: 20, flexDirection: 'column'}}>
            {Object.entries(args)
                .map(([key, item]) => {
                    if (typeof item !== 'object' || item === null) {
                        return null;
                    }
                    return <MapBlock key={key} {...(blockTransform(item) as MapBlockProps)} />;
                })
                .filter(Boolean)}
        </div>
    </MapProvider>
);

const GMAP_API_KEY = process.env.STORYBOOK_GMAP_API_KEY;

const MapsTypesTemplate: StoryFn<Record<string, MapBlockModel>> = (args) => {
    const entries = Object.entries(args);
    const yandexMap = entries[0];
    const googleMap = entries[1];

    return (
        <React.Fragment>
            {yandexMap && (
                <MapProvider
                    scriptSrc={scriptsSrc[MapType.Yandex]}
                    apiKey={ymapApiKeyForStorybook}
                    type={MapType.Yandex}
                >
                    <MapBlock {...(blockTransform(yandexMap[1]) as MapBlockProps)} />
                </MapProvider>
            )}
            {googleMap && (
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
                    <MapBlock {...(blockTransform(googleMap[1]) as MapBlockProps)} />
                </MapProvider>
            )}
        </React.Fragment>
    );
};

const EnhancedTitleTemplate: StoryFn<Record<string, MapBlockModel>> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <div style={{padding: '64px', display: 'flex', gap: 20, flexDirection: 'column'}}>
            {Object.entries(args)
                .map(([key, item]) => {
                    if (typeof item !== 'object' || item === null) {
                        return null;
                    }
                    const transformedItem =
                        key === 'interactive'
                            ? {
                                  ...item,
                                  title: {
                                      ...(typeof item.title === 'object' && item.title !== null
                                          ? item.title
                                          : {}),
                                      onClick: () => alert('Map title clicked!'),
                                  },
                              }
                            : item;

                    return (
                        <MapBlock
                            key={key}
                            {...(blockTransform(transformedItem) as MapBlockProps)}
                        />
                    );
                })
                .filter(Boolean)}
        </div>
    </MapProvider>
);

export const Default = DefaultTemplate.bind({});
export const WithControls = ControlsTemplate.bind({});
export const Size = SizeTemplate.bind({});
export const Direction = DirectionTemplate.bind({});
export const MapsTypes = MapsTypesTemplate.bind({});
export const EnhancedTitle = EnhancedTitleTemplate.bind({});

Default.args = {
    ...data.default.content,
    title: data.common.title,
    description: data.common.description,
    map: data.ymap,
} as MapBlockModel;

const CONTROLS_MAPS: Record<string, MapBlockModel> = {
    with_additional_info: {
        ...data.default.content,
        title: data.common.title,
        description: data.common.description,
        additionalInfo: data.common.additionalInfo,
        map: data.ymap,
    } as MapBlockModel,
    with_links: {
        ...data.default.content,
        title: data.common.title,
        description: data.common.description,
        links: data.common.links,
        map: {
            ...data.ymap,
            id: 'common-places-2',
        },
    } as MapBlockModel,
    with_buttons: {
        ...data.default.content,
        title: data.common.title,
        description: data.common.description,
        buttons: data.common.buttons,
        map: {
            ...data.ymap,
            id: 'common-places-3',
        },
    } as MapBlockModel,
};

WithControls.args = CONTROLS_MAPS;
WithControls.parameters = {
    controls: {
        include: Object.keys(CONTROLS_MAPS),
    },
};

const SIZE_MAPS: Record<string, MapBlockModel> = {
    default_media: {
        ...data.default.content,
        title: data.size.defaultMediaTitle,
        description: data.common.description,
        map: data.ymap,
    } as MapBlockModel,
    large_media: {
        ...data.default.content,
        largeMedia: true,
        title: data.size.largeMediaTitle,
        description: data.common.description,
        map: {
            ...data.ymap,
            id: 'common-places-2',
        },
    } as MapBlockModel,
    media_only: {
        ...data.default.content,
        mediaOnly: true,
        description: undefined,
        title: data.size.mediaOnlyTitle,
        map: {
            ...data.ymap,
            id: 'common-places-3',
        },
    } as MapBlockModel,
};

Size.args = SIZE_MAPS;
Size.parameters = {
    controls: {
        include: Object.keys(SIZE_MAPS),
    },
};

const DIRECTION_MAPS: Record<string, MapBlockModel> = {
    default_direction: {
        ...data.default.content,
        title: data.direction.defaultDirectionTitle,
        description: data.common.description,
        map: data.ymap,
    } as MapBlockModel,
    reverse_direction: {
        ...data.default.content,
        title: data.direction.ReverseDirectionTitle,
        description: data.common.description,
        direction: 'media-content',
        map: {
            ...data.ymap,
            id: 'common-places-2',
        },
    } as MapBlockModel,
    mobile_reverse_direction: {
        ...data.default.content,
        title: data.direction.ReverseDirectionTitle,
        description: data.common.description,
        mobileDirection: 'media-content',
        map: {
            ...data.ymap,
            id: 'common-places-3',
        },
    } as MapBlockModel,
};

Direction.args = DIRECTION_MAPS;
Direction.parameters = {
    controls: {
        include: Object.keys(DIRECTION_MAPS),
    },
};

const MAPS_TYPES: Record<string, MapBlockModel> = {
    yandex_map: {
        ...data.default.content,
        title: data.direction.defaultDirectionTitle,
        description: data.common.description,
        map: data.ymap,
    } as MapBlockModel,
    google_map: {
        ...data.default.content,
        title: data.direction.ReverseDirectionTitle,
        description: data.common.description,
        direction: 'media-content',
        map: data.gmap,
    } as MapBlockModel,
};

MapsTypes.args = MAPS_TYPES;
MapsTypes.parameters = {
    controls: {
        include: Object.keys(MAPS_TYPES),
    },
};

const ENHANCED_TITLE_MAPS: Record<string, MapBlockModel> = {
    large_clickable: {
        ...data.default.content,
        ...data.enhancedTitle.largeClickable,
        description: data.common.description,
        map: data.ymap,
    } as MapBlockModel,
    interactive: {
        ...data.default.content,
        ...data.enhancedTitle.interactiveWithIcon,
        description: data.common.description,
        map: {
            ...data.ymap,
            id: 'interactive-title-map',
        },
    } as MapBlockModel,
};

EnhancedTitle.args = ENHANCED_TITLE_MAPS;
EnhancedTitle.parameters = {
    controls: {
        include: Object.keys(ENHANCED_TITLE_MAPS),
    },
};
