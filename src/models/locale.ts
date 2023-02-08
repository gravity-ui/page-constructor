export enum Lang {
    Ru = 'ru',
    En = 'en',
}

export enum Currency {
    RUB = 'RUB',
    USD = 'USD',
    KZT = 'KZT',
}

export interface LangData {
    lang: Lang;
    langName: string;
    regions: Record<string, RegionData>;
    pathPrefix: string;
}

export interface RegionData {
    regionName: string;
    tld: string;
    currency: string;
    order: number;
    default: boolean;
    local: boolean;
}

export interface LocaleData extends Pick<LangData, 'lang'>, Omit<RegionData, 'regionName'> {
    code: string;
    region: string;
}

export interface Locale
    extends Partial<Pick<LangData, 'langName'>>,
        Pick<LangData, 'lang'>,
        Partial<Pick<LangData, 'pathPrefix'>>,
        Partial<Pick<LocaleData, 'code'>> {}
