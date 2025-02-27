import {Meta, StoryFn} from '@storybook/react';

import {scriptsSrc, ymapApiKeyForStorybook} from '../../../../.storybook/maps';
import {MapType} from '../../../context/mapsContext/mapsContext';
import {MapProvider, gmapApiKeyIdInLS} from '../../../context/mapsContext/mapsProvider';
import {MapProps} from '../../../models';
import Map from '../Map';

import {ApiKeyInput} from './ApiKeyInput';

import data from './data.json';

const maxMapWidth = '500px';

export default {
    component: Map,
    title: 'Components/Map',
} as Meta;

const YMapTemplate: StoryFn<MapProps> = (args: MapProps) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <div style={{maxWidth: maxMapWidth}}>
            <Map {...args} />
        </div>
    </MapProvider>
);

const GMAP_API_KEY = process.env.STORYBOOK_GMAP_API_KEY;

const GoogleMapTemplate: StoryFn<MapProps> = (args: MapProps) => (
    <MapProvider scriptSrc={scriptsSrc[MapType.Google]} type={MapType.Google} apiKey={GMAP_API_KEY}>
        <div style={{maxWidth: maxMapWidth, margin: '10px'}}>
            {!GMAP_API_KEY && <ApiKeyInput id={gmapApiKeyIdInLS} />}
            <Map {...args} />
        </div>
    </MapProvider>
);

export const GoogleMap = GoogleMapTemplate.bind({});
export const YMap = YMapTemplate.bind({});

YMap.args = data.ymap;
GoogleMap.args = data.gmap;
