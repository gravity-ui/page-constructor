import React, {useContext, useEffect, useRef, useState, useCallback} from 'react';
import _ from 'lodash';
import {Spin} from '@gravity-ui/uikit';

import {block} from '../../../utils';
import {MapsContext} from '../../../context/mapsContext/mapsContext';
import {LocaleContext} from '../../../context/localeContext/localeContext';
import ErrorWrapper from '../../ErrorWrapper/ErrorWrapper';
import {YMapProps} from '../../../models';
import {YMap} from './YMap';
import {YMapsApiLoader, MapApiStatus} from './YandexMapApiLoader';
import i18n from './i18n';
import {MobileContext} from '../../../context/mobileContext';
import {getMapHeight} from '../helpers';

const b = block('map');
const DEFAULT_CONTAINER_ID = 'ymap';
const DEFAULT_ZOOM = 9;

const YandexMap: React.FC<YMapProps> = (props) => {
    const {markers, zoom, center, id} = props;
    const {apiKey, scriptSrc, nonce} = useContext(MapsContext);
    const isMobile = useContext(MobileContext);

    const {lang = 'ru'} = useContext(LocaleContext);
    const containerId = `${DEFAULT_CONTAINER_ID}-${id}`;

    const [ymap, setYmaps] = useState<YMap | null>(null);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const ref = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [attemptsIndex, setAttemptsIndex] = useState<number>(0);
    const onTryAgain = useCallback(() => {
        setAttemptsIndex(attemptsIndex + 1);
    }, [attemptsIndex]);

    useEffect(() => {
        (async function () {
            if (!center) {
                return;
            }

            setLoading(true);

            await YMapsApiLoader.loadApi(apiKey, scriptSrc, lang, nonce);

            window.ymaps?.ready(() => {
                setYmaps(
                    new YMap(
                        new window.ymaps.Map(
                            containerId,
                            {
                                center,
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
    }, [apiKey, lang, scriptSrc, containerId, zoom, center, nonce, attemptsIndex, setLoading]);

    useEffect(() => {
        const updateSize = _.debounce(() => {
            if (ref.current) {
                setHeight(Math.round(getMapHeight(ref.current.offsetWidth, isMobile)));
            }
        }, 100);

        updateSize();
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [markers, ymap, setYmaps, isMobile]);

    useEffect(() => {
        if (ymap) {
            ymap.showPlacemarks(markers);
        }
    });

    if (!center) return null;

    return (
        <ErrorWrapper
            isError={YMapsApiLoader.status === MapApiStatus.Error}
            text={i18n('map-load-error')}
            buttonText={i18n('map-try-again')}
            handler={onTryAgain}
            className={b('wrapper')}
        >
            <div id={containerId} className={b()} ref={ref} style={{height}}>
                {loading ? <Spin size="xl" className={b('spinner')} /> : null}
            </div>
        </ErrorWrapper>
    );
};

export default YandexMap;
