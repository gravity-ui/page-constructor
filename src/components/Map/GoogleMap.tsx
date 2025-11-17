import * as React from 'react';

import {Lang} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';

import {LocaleContext} from '../../context/localeContext/localeContext';
import {MapsContext} from '../../context/mapsContext/mapsContext';
import {MobileContext} from '../../context/mobileContext';
import {GMapProps} from '../../models';
import {block} from '../../utils';

import {getMapHeight} from './helpers';

const b = block('map');

interface GoogleMapLinkParams {
    apiKey: string;
    scriptSrc: string;
    address: string;
    lang: `${Lang}`;
    zoom?: number;
}

function getScriptSrc(params: GoogleMapLinkParams) {
    const {apiKey, scriptSrc, address, lang, zoom} = params;

    return `${scriptSrc}?key=${apiKey}&language=${lang}${zoom ? '&zoom=' + zoom : ''}&q=${encodeURI(
        address,
    )}`;
}

const GoogleMap = (props: GMapProps) => {
    const {address, zoom, className, forceAspectRatio = true} = props;
    const {apiKey, scriptSrc} = React.useContext(MapsContext);
    const {lang = Lang.Ru} = React.useContext(LocaleContext);
    const isMobile = React.useContext(MobileContext);

    const [height, setHeight] = React.useState<number | undefined>(undefined);
    const ref = React.useRef<HTMLIFrameElement>(null);
    const src = React.useMemo(
        () => getScriptSrc({apiKey, scriptSrc, address, lang, zoom}),
        [apiKey, scriptSrc, address, lang, zoom],
    );

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
    }, [forceAspectRatio, isMobile]);

    // Generate Schema.org JSON-LD for Google Map
    const mapMicrodataScript = React.useMemo(() => {
        if (!address) {
            return null;
        }

        const json = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Place',
            address,
        });

        return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json}} />;
    }, [address]);

    if (!apiKey || !address) {
        return null;
    }

    return (
        <iframe
            className={b(null, className)}
            ref={ref}
            style={{
                height,
            }}
            title="Google Map"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
        >
            {mapMicrodataScript}
        </iframe>
    );
};

export default GoogleMap;
