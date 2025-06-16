import * as React from 'react';

import {Spin} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';

import {LocaleContext} from '../../../context/localeContext/localeContext';
import {MapsContext} from '../../../context/mapsContext/mapsContext';
import {MobileContext} from '../../../context/mobileContext';
import {YMapProps} from '../../../models';
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

const YandexMap = (props: YMapProps) => {
    const {markers, zoom, id, className} = props;
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
                            },
                            {autoFitToViewport: 'always'},
                        ),
                        ref.current,
                    ),
                );
            });

            setLoading(false);
        })();
    }, [apiKey, lang, scriptSrc, containerId, zoom, nonce, attemptsIndex, setLoading]);

    React.useEffect(() => {
        const updateSize = debounce(() => {
            if (ref.current) {
                setHeight(Math.round(getMapHeight(ref.current.offsetWidth, isMobile)));
            }
        }, 100);

        updateSize();
        window.addEventListener('resize', updateSize, {passive: true});

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [markers, ymap, setYmaps, isMobile]);

    React.useEffect(() => {
        if (ymap) {
            // show with computed center and placemarks
            const showPlacemarks = async () => {
                await ymap.showPlacemarks({markers, zoom});

                setReady(true);
            };

            showPlacemarks();
        }
    });

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
