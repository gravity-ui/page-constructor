import React, {useContext} from 'react';

import {MapType, MapsContext} from '../../context/mapsContext/mapsContext';
import {GMapProps, MapProps, YMapProps} from '../../models';

import GoogleMap from './GoogleMap';
import YandexMap from './YMap/YandexMap';

import './Map.scss';

export const Map = (props: MapProps) => {
    const {type} = useContext(MapsContext);

    switch (type) {
        case MapType.Yandex:
            return <YandexMap {...(props as YMapProps)} />;
        case MapType.Google:
            return <GoogleMap {...(props as GMapProps)} />;
        default:
            return null;
    }
};

export default Map;
