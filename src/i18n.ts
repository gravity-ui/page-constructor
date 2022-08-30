import {I18N} from '@yandex-cloud/i18n';
import {getConfig, subscribeConfigure, Lang} from './utils/configure';

export const i18n = new I18N();

i18n.setLang(getConfig().lang || Lang.En);

subscribeConfigure((config) => {
    if (config.lang) {
        i18n.setLang(config.lang);
    }
});
