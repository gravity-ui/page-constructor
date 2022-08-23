import React from 'react';
import {Lang, Locale} from 'models/locale';

export type LocaleContextProps = {
    locale?: Locale;
};

export const LocaleContext = React.createContext<LocaleContextProps>({
    locale: {
        code: 'ru-RU',
        name: 'Россия (Русский)',
        lang: Lang.Ru,
        langName: 'Русский',
        region: 'ru',
        regionName: 'Россия',
        currency: 'RUB',
        tld: 'ru',
        order: 1,
        default: true,
        local: true,
    },
});
