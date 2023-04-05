import {I18N} from '@gravity-ui/i18n';

import {Lang, getConfig, subscribeConfigure} from './utils/configure';

export const i18n = new I18N();

i18n.setLang(getConfig().lang || Lang.En);

subscribeConfigure((config) => {
    if (config.lang) {
        i18n.setLang(config.lang);
    }
});
