import {Coordinate} from '../../../models/constructor-items/common';

import {YMapMarker, YMapMarkerLabel} from '../../../models';

enum GeoObjectTypes {
    Properties = 'properties',
    Options = 'options',
}

const DEFAULT_PLACEMARKS_COLOR = '#dc534b';
// presetStorage: https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/option.presetStorage.html
const DEFAULT_PLACEMARKS_PRESET = 'islands#dotIcon';
const DEFAULT_MAP_CONTROL_BUTTON_HEIGHT = 30;

const geoObjectPropsAndOptions = {
    iconCaption: GeoObjectTypes.Properties,
    iconContent: GeoObjectTypes.Properties,
    iconColor: GeoObjectTypes.Options,
    preset: GeoObjectTypes.Options,
};

export class YMap {
    private ymap: Ymaps.Map;
    private mapRef: HTMLDivElement | null;
    private coords: Coordinate[] = [];

    constructor(ymap: Ymaps.Map, mapRef: HTMLDivElement | null) {
        this.ymap = ymap;
        this.mapRef = mapRef;
    }

    async showPlacemarks(markers: YMapMarker[]) {
        this.clearOldPlacemarks();

        for (const marker of markers) {
            if (marker.address) {
                await this.findAddress(marker);
            } else if (marker.coordinate) {
                this.findCoordinate(marker);
            }
        }

        this.recalcZoomAndCenter();
    }

    async findAddress(marker: YMapMarker) {
        try {
            const res = await window.ymaps.geocode(marker.address, {results: 1});
            const geoObject = res.geoObjects.get(0);
            const coordinate = geoObject.geometry.getCoordinates();

            this.coords.push(coordinate);

            this.drawPlaceMarkStyle(geoObject, marker);

            this.ymap.geoObjects.add(geoObject);
        } catch {} // If error - placemark will not be displayed
    }

    findCoordinate(marker: YMapMarker) {
        const geoObject = new window.ymaps.Placemark(marker.coordinate, {});

        this.coords.push(marker.coordinate as Coordinate);
        this.drawPlaceMarkStyle(geoObject, marker);
        this.ymap.geoObjects.add(geoObject);
    }

    private drawPlaceMarkStyle(geoObject: Ymaps.GeoObject, marker: YMapMarker) {
        if (!marker.label) {
            return;
        }

        const {iconColor, preset = DEFAULT_PLACEMARKS_PRESET} = marker.label;
        let localIconColor: string | undefined = iconColor;

        // You can set the preset option together with the iconColor option only if it not a 'Stretchy' preset
        if (!preset.includes('Stretchy') && !iconColor) {
            localIconColor = DEFAULT_PLACEMARKS_COLOR;
        }

        Object.entries({...marker.label, iconColor: localIconColor, preset}).forEach(
            ([key, value]) => {
                const geoObjectParamType: GeoObjectTypes | undefined =
                    geoObjectPropsAndOptions[key as keyof YMapMarkerLabel];

                if (value && geoObjectParamType) {
                    geoObject[geoObjectParamType].set(key, value);
                }
            },
        );
    }

    private recalcZoomAndCenter() {
        const coordsLength = this.coords.length;

        if (!coordsLength) {
            return;
        }

        let leftBottom = [Infinity, Infinity],
            rightTop = [-Infinity, -Infinity];

        this.coords.forEach((point) => {
            leftBottom = [Math.min(leftBottom[0], point[0]), Math.min(leftBottom[1], point[1])];
            rightTop = [Math.max(rightTop[0], point[0]), Math.max(rightTop[1], point[1])];
        });

        const newMapParams = window.ymaps.util.bounds.getCenterAndZoom(
            [leftBottom, rightTop],
            [this.mapRef?.clientWidth, this.mapRef?.clientHeight],
            undefined,
            {margin: DEFAULT_MAP_CONTROL_BUTTON_HEIGHT},
        );

        this.ymap.setCenter(newMapParams.center);

        // Use default zoom for one placemark
        if (coordsLength > 1) {
            this.ymap.setZoom(newMapParams.zoom);
        }
    }

    private clearOldPlacemarks() {
        if (this.coords.length === 0) {
            return;
        }

        this.ymap.geoObjects.removeAll();
        this.coords = [];
    }
}
