import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Map from '../Map';
import {MapProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';
import {MapProvider, gmapApiKeyIdInLS} from '../../../context/mapsContext/mapsProvider';
import {MapType} from '../../../context/mapsContext/mapsContext';
import {ymapApiKeyForStorybook, scriptsSrc} from '../../../../.storybook/maps';

import {ApiKeyInput} from './ApiKeyInput';

import data from './data.json';

const maxMapWidth = '500px';

export default {
    component: Map,
    title: `${COMPONENTS}/Map`,
} as Meta;

const YMapTemplate: Story<MapProps> = (args) => (
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

const GoogleMapTemplate: Story<MapProps> = (args) => (
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
