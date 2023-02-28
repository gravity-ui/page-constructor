import React, {useContext, useEffect, useRef, useState, useMemo} from 'react';
import _ from 'lodash';

import {block} from '../../utils';
import {MapsContext} from '../../context/mapsContext/mapsContext';
import {GMapProps} from '../../models';
import {LocaleContext} from '../../context/localeContext/localeContext';
import {MobileContext} from '../../context/mobileContext';
import {getMapHeight} from './helpers';

const b = block('map');

function getScriptSrc(apiKey: string, scriptSrc: string, address: string, lang: 'ru' | 'en') {
    return `${scriptSrc}?key=${apiKey}&language=${lang}&q=${encodeURI(address)}`;
}

const GoogleMap: React.FC<GMapProps> = (props) => {
    const {address} = props;
    const {apiKey, scriptSrc} = useContext(MapsContext);
    const {lang = 'ru'} = useContext(LocaleContext);
    const isMobile = useContext(MobileContext);

    const [height, setHeight] = useState<number | undefined>(undefined);
    const ref = useRef<HTMLIFrameElement>(null);
    const src = useMemo(
        () => getScriptSrc(apiKey, scriptSrc, address, lang),
        [apiKey, scriptSrc, address, lang],
    );

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
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
        />
    );
};

export default GoogleMap;
