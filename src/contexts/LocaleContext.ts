import React from 'react';
import {Lang, Locale} from 'models/locale';

export type LocaleContextProps = {
    lang?: Lang;
    tld?: string;
    locale?: Locale;
};

export const LocaleContext = React.createContext<LocaleContextProps>({
    lang: Lang.Ru,
    tld: '.ru',
    // locale: {},
});
