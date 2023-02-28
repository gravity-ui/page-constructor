import {loadScript} from '../../../utils';
import {Maplangs} from '../../../context/mapsContext/mapsContext';

export enum MapApiStatus {
    NotStarted = 'not_started',
    Loading = 'loading',
    Loaded = 'loaded',
    Error = 'error',
}

const SCRIPT_ID = 'ymaps-script';

export class YMapsApiLoader {
    static status = MapApiStatus.NotStarted;
    static loader: Promise<unknown>;

    static async loadApi(apiKey: string, scriptSrc: string, lang: 'ru' | 'en', nonce?: string) {
        if (YMapsApiLoader.status === MapApiStatus.Loaded) {
            return Promise.resolve();
        }

        if (YMapsApiLoader.status === MapApiStatus.Loading) {
            await YMapsApiLoader.loader;

            return Promise.resolve();
        }

        YMapsApiLoader.status = MapApiStatus.Loading;

        const csp = nonce ? `csp[style_nonce]=${nonce}` : 'csp=true';
        const src = `${scriptSrc}?apikey=${apiKey}&lang=${Maplangs[lang]}&${csp}`;

        YMapsApiLoader.loader = loadScript(src, {id: SCRIPT_ID})
            .then(() => {
                YMapsApiLoader.status = MapApiStatus.Loaded;
            })
            .catch(() => {
                YMapsApiLoader.status = MapApiStatus.Error;
            });

        return this.loader;
    }
}
