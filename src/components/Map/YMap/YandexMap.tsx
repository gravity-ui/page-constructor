import * as React from 'react';

import {Spin} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';

import {LocaleContext} from '../../../context/localeContext/localeContext';
import {MapsContext} from '../../../context/mapsContext/mapsContext';
import {MobileContext} from '../../../context/mobileContext';
import {YMapMarkerLabelPrivate, YMapMarkerPrivate, YMapProps} from '../../../models';
import {block} from '../../../utils';
import ErrorWrapper from '../../ErrorWrapper/ErrorWrapper';
import {getMapHeight} from '../helpers';

import {YMap} from './YMap';
import {MapApiStatus, YMapsApiLoader} from './YandexMapApiLoader';
import {i18n} from './i18n';

const b = block('map');
const DEFAULT_CONTAINER_ID = 'ymap';
const DEFAULT_ZOOM = 9;
// Center - is a required parameter for creating a new map
// We use this init center to create a map
// The real center of the map will be calculated later, using the coordinates of the markers
const INITIAL_CENTER = [0, 0];

const BALLOON_DISABLING_MARKER_OPTIONS: YMapMarkerLabelPrivate = {
    cursor: 'drag',
    interactivityModel: 'default#silent',
};

const YandexMap = (props: YMapProps) => {
    const {
        markers,
        zoom,
        id,
        disableControls = false,
        disableBalloons = false,
        areaMargin,
        copyrightPosition,
        className,
        forceAspectRatio = true,
    } = props;
    const {apiKey, scriptSrc, nonce} = React.useContext(MapsContext);
    const isMobile = React.useContext(MobileContext);

    const {lang = 'ru'} = React.useContext(LocaleContext);
    const containerId = `${DEFAULT_CONTAINER_ID}-${id}`;

    const [ymap, setYmaps] = React.useState<YMap | null>(null);
    const [height, setHeight] = React.useState<number | undefined>(undefined);
    const ref = React.useRef<HTMLDivElement>(null);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [ready, setReady] = React.useState<boolean>(false);
    const [attemptsIndex, setAttemptsIndex] = React.useState<number>(0);
    const onTryAgain = React.useCallback(() => {
        setAttemptsIndex(attemptsIndex + 1);
    }, [attemptsIndex]);

    React.useEffect(() => {
        (async function () {
            setLoading(true);

            await YMapsApiLoader.loadApi(apiKey, scriptSrc, lang, nonce);

            window.ymaps?.ready(() => {
                setYmaps(
                    new YMap(
                        new window.ymaps.Map(
                            containerId,
                            {
                                center: INITIAL_CENTER,
                                zoom: zoom || DEFAULT_ZOOM,
                                controls: disableControls ? [] : undefined,
                            },
                            {
                                autoFitToViewport: 'always',
                                suppressMapOpenBlock: disableControls,
                                yandexMapDisablePoiInteractivity: disableControls,
                                copyrightPosition,
                            },
                        ),
                        ref.current,
                    ),
                );
            });

            setLoading(false);
        })();
    }, [
        apiKey,
        lang,
        scriptSrc,
        containerId,
        zoom,
        nonce,
        attemptsIndex,
        setLoading,
        disableControls,
        copyrightPosition,
    ]);

    React.useEffect(() => {
        if (!forceAspectRatio) {
            return;
        }

        const updateSize = debounce(() => {
            if (ref.current) {
                setHeight(Math.round(getMapHeight(ref.current.offsetWidth, isMobile)));
            }
        }, 100);

        updateSize();
        window.addEventListener('resize', updateSize, {passive: true});

        // eslint-disable-next-line consistent-return
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [isMobile, forceAspectRatio]);

    React.useEffect(() => {
        if (ymap) {
            // show with computed center and placemarks
            const showPlacemarks = async () => {
                const privateMarkers: YMapMarkerPrivate[] = disableBalloons
                    ? markers.map(({label, ...marker}) => ({
                          ...marker,
                          label: {...label, ...BALLOON_DISABLING_MARKER_OPTIONS},
                      }))
                    : markers;

                await ymap.showPlacemarks({markers: privateMarkers, zoom, areaMargin});

                setReady(true);
            };

            showPlacemarks();
        }
    }, [ymap, markers, zoom, disableBalloons, areaMargin]);

    const mapMicrodataScript = React.useMemo(() => {
        const places = markers
            .filter((marker) => marker.address || marker.coordinate)
            .map((marker) => {
                const place: any = {
                    '@type': 'Place',
                };

                if (marker.address) {
                    place.address = {
                        '@type': 'Text',
                        '@value': marker.address,
                    };
                }

                if (marker.coordinate && marker.coordinate.length === 2) {
                    place.geo = {
                        '@type': 'GeoCoordinates',
                        latitude: marker.coordinate[0],
                        longitude: marker.coordinate[1],
                    };
                }

                return place;
            });

        const json = JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': places,
        });

        return places.length > 0 ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json}} />
        ) : null;
    }, [markers]);

    if (!markers) return null;

    return (
        <ErrorWrapper
            isError={YMapsApiLoader.status === MapApiStatus.Error}
            text={i18n('map-load-error')}
            buttonText={i18n('map-try-again')}
            handler={onTryAgain}
            className={b('wrapper')}
        >
            <div className={b('wrapper')}>
                {mapMicrodataScript}
                {/* hidden - to show the map after calculating the center */}
                <div
                    id={containerId}
                    className={b({hidden: !ready}, className)}
                    ref={ref}
                    style={{height}}
                />
                {loading ? <Spin size="xl" className={b('spinner')} /> : null}
            </div>
        </ErrorWrapper>
    );
};

export default YandexMap;
