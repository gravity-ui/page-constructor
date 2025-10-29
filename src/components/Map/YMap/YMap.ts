import {YMapMarkerLabelPrivate, YMapMarkerPrivate, YMapProps} from '../../../models';
import {Coordinate} from '../../../models/constructor-items/common';

import {ParsedMargin, calculateMapParamsWithMarginAndZoom, parseMargin} from './utils';

enum GeoObjectTypes {
    Properties = 'properties',
    Options = 'options',
}

const DEFAULT_PLACEMARKS_COLOR = '#dc534b';
// presetStorage: https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/option.presetStorage.html
const DEFAULT_PLACEMARKS_PRESET = 'islands#dotIcon';
const DEFAULT_MAP_CONTROL_BUTTON_HEIGHT = 30;

const geoObjectPropsAndOptions: Record<keyof YMapMarkerLabelPrivate, GeoObjectTypes> = {
    cursor: GeoObjectTypes.Options,
    iconCaption: GeoObjectTypes.Properties,
    iconContent: GeoObjectTypes.Properties,
    iconColor: GeoObjectTypes.Options,
    iconImageHref: GeoObjectTypes.Options,
    iconImageSize: GeoObjectTypes.Options,
    iconImageOffset: GeoObjectTypes.Options,
    iconImageClipRect: GeoObjectTypes.Options,
    iconLayout: GeoObjectTypes.Options,
    iconShape: GeoObjectTypes.Options,
    interactivityModel: GeoObjectTypes.Options,
    preset: GeoObjectTypes.Options,
};

type PlacemarksProps = Pick<YMapProps, 'zoom' | 'markers' | 'areaMargin'>;

export class YMap {
    private ymap: Ymaps.Map;
    private mapRef: HTMLDivElement | null;
    private coords: Coordinate[] = [];

    constructor(ymap: Ymaps.Map, mapRef: HTMLDivElement | null) {
        this.ymap = ymap;
        this.mapRef = mapRef;
    }

    async showPlacemarks(props: PlacemarksProps) {
        this.clearOldPlacemarks();

        for (const marker of props.markers) {
            if (marker.address) {
                await this.findAddress(marker);
            } else if (marker.coordinate) {
                this.findCoordinate(marker);
            }
        }

        this.recalcZoomAndCenter(props);
    }

    async findAddress(marker: YMapMarkerPrivate) {
        try {
            const res = await window.ymaps.geocode(marker.address, {results: 1});
            const geoObject = res.geoObjects.get(0);
            const coordinate = geoObject.geometry.getCoordinates();

            this.coords.push(coordinate);

            this.drawPlaceMarkStyle(geoObject, marker);

            this.ymap.geoObjects.add(geoObject);
        } catch {} // If error - placemark will not be displayed
    }

    findCoordinate(marker: YMapMarkerPrivate) {
        const geoObject = new window.ymaps.Placemark(marker.coordinate, {});

        this.coords.push(marker.coordinate as Coordinate);
        this.drawPlaceMarkStyle(geoObject, marker);
        this.ymap.geoObjects.add(geoObject);
    }

    private drawPlaceMarkStyle(geoObject: Ymaps.GeoObject, marker: YMapMarkerPrivate) {
        const {iconColor, preset = DEFAULT_PLACEMARKS_PRESET} = marker.label || {};
        let localIconColor: string | undefined = iconColor;

        // You can set the preset option together with the iconColor option only if it not a 'Stretchy' preset
        if (!preset.includes('Stretchy') && !iconColor) {
            localIconColor = DEFAULT_PLACEMARKS_COLOR;
        }

        Object.entries({
            ...marker.label,
            iconColor: localIconColor,
            preset,
        }).forEach(([key, value]) => {
            const geoObjectParamType: GeoObjectTypes | undefined =
                geoObjectPropsAndOptions[key as keyof YMapMarkerLabelPrivate];

            if (value && geoObjectParamType) {
                geoObject[geoObjectParamType].set(key, value);
            }
        });
    }

    // eslint-disable-next-line complexity
    private recalcZoomAndCenter(props: PlacemarksProps) {
        const coordsLength = this.coords.length;
        const {zoom = 0, areaMargin} = props;

        if (!coordsLength) {
            return;
        }

        const utils = window.ymaps.util.bounds;

        const [leftTop, rightBottom] = utils.fromPoints(this.coords);

        let newMapParams = {
            zoom,
            center: [],
        };

        const parsedAreaMargin = areaMargin
            ? parseMargin(areaMargin)
            : ([0, 0, 0, 0] as ParsedMargin);

        const hasZoom = Boolean(zoom);
        const hasAreaMargin = parsedAreaMargin.some(Boolean);
        const containerSize = [
            this.mapRef?.clientWidth ?? 0,
            this.mapRef?.clientHeight ?? 0,
        ] as Coordinate;

        switch (true) {
            case hasAreaMargin && hasZoom:
                // calculate center and zoom in accordace with current zoom and margin
                newMapParams = calculateMapParamsWithMarginAndZoom(
                    [leftTop, rightBottom],
                    zoom,
                    parsedAreaMargin,
                    containerSize,
                );
                break;
            case hasAreaMargin:
                // calculate center and zoom with custom margin
                newMapParams = utils.getCenterAndZoom(
                    [leftTop, rightBottom],
                    containerSize,
                    undefined,
                    {margin: areaMargin, preciseZoom: true},
                );
                break;
            case hasZoom:
                // calculate only center
                newMapParams.center = utils.getCenter([leftTop, rightBottom]);
                break;
            default:
                // calculate center and zoom with default margin
                newMapParams = utils.getCenterAndZoom(
                    [leftTop, rightBottom],
                    containerSize,
                    undefined,
                    {margin: DEFAULT_MAP_CONTROL_BUTTON_HEIGHT},
                );
        }

        this.ymap.setCenter(newMapParams.center);

        // Use default zoom for one placemark
        if (coordsLength <= 1 && !hasAreaMargin && hasZoom) {
            return;
        }

        this.ymap.setZoom(newMapParams.zoom);
    }

    private clearOldPlacemarks() {
        if (this.coords.length === 0) {
            return;
        }

        this.ymap.geoObjects.removeAll();
        this.coords = [];
    }
}
