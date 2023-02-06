import React, {useContext} from 'react';

import {MapProps, YMapProps, GMapProps} from '../../models';
import {MapsContext, MapType} from '../../context/mapsContext/mapsContext';
import YandexMap from './YMap/YandexMap';
import GoogleMap from './GoogleMap';

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
