import {i18n} from './i18n';

export enum Lang {
    Ru = 'ru',
    En = 'en',
}

export interface ProjectConfigParams {
    lang: Lang;
}

export const configure = ({lang}: ProjectConfigParams) => {
    i18n.setLang(lang);
};
