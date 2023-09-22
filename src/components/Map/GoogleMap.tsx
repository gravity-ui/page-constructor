import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';

import debounce from 'lodash/debounce';

import {LocaleContext} from '../../context/localeContext/localeContext';
import {MapsContext} from '../../context/mapsContext/mapsContext';
import {MobileContext} from '../../context/mobileContext';
import {GMapProps} from '../../models';
import {block} from '../../utils';
import {Lang} from '../../utils/configure';

import {getMapHeight} from './helpers';

const b = block('map');

interface GoogleMapLinkParams {
    apiKey: string;
    scriptSrc: string;
    address: string;
    lang: Lang;
    zoom?: number;
}

function getScriptSrc(params: GoogleMapLinkParams) {
    const {apiKey, scriptSrc, address, lang, zoom} = params;

    return `${scriptSrc}?key=${apiKey}&language=${lang}${zoom ? '&zoom=' + zoom : ''}&q=${encodeURI(
        address,
    )}`;
}

const GoogleMap: React.FC<GMapProps> = (props) => {
    const {address, zoom} = props;
    const {apiKey, scriptSrc} = useContext(MapsContext);
    const {lang = Lang.Ru} = useContext(LocaleContext);
    const isMobile = useContext(MobileContext);

    const [height, setHeight] = useState<number | undefined>(undefined);
    const ref = useRef<HTMLIFrameElement>(null);
    const src = useMemo(
        () => getScriptSrc({apiKey, scriptSrc, address, lang, zoom}),
        [apiKey, scriptSrc, address, lang, zoom],
    );

    useEffect(() => {
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
    }, [isMobile]);

    if (!apiKey || !address) {
        return null;
    }

    return (
        <iframe
            className={b()}
            ref={ref}
            style={{
                height,
            }}
            title="Google Map"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
        />
    );
};

export default GoogleMap;
