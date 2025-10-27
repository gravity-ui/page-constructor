import {YMapMarkerLabelPrivate, YMapMarkerPrivate, YMapProps} from '../../../models';
import {Coordinate} from '../../../models/constructor-items/common';

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

type PlacemarksProps = Pick<YMapProps, 'zoom' | 'markers'>;

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

    private recalcZoomAndCenter(props: PlacemarksProps) {
        const coordsLength = this.coords.length;
        const {zoom = 0} = props;

        if (!coordsLength) {
            return;
        }

        let leftBottom = [Infinity, Infinity],
            rightTop = [-Infinity, -Infinity];

        this.coords.forEach((point) => {
            leftBottom = [Math.min(leftBottom[0], point[0]), Math.min(leftBottom[1], point[1])];
            rightTop = [Math.max(rightTop[0], point[0]), Math.max(rightTop[1], point[1])];
        });

        let newMapParams = {
            zoom,
            center: [],
        };

        if (zoom) {
            // compute only the center
            newMapParams.center = window.ymaps.util.bounds.getCenter([leftBottom, rightTop]);
        } else {
            newMapParams = window.ymaps.util.bounds.getCenterAndZoom(
                [leftBottom, rightTop],
                [this.mapRef?.clientWidth, this.mapRef?.clientHeight],
                undefined,
                {margin: DEFAULT_MAP_CONTROL_BUTTON_HEIGHT},
            );
        }

        this.ymap.setCenter(newMapParams.center);

        // Use default zoom for one placemark
        if (coordsLength > 1 && !zoom) {
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
