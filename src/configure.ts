import {Lang} from './models/locale';

import {i18n} from './i18n';

export interface ProjectConfigParams {
    lang: Lang;
}

export const configure = ({lang}: ProjectConfigParams) => {
    i18n.setLang(lang);
};
