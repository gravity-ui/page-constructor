import React from 'react';
import {Lang, Locale} from '../models/locale';

export type LocaleContextProps = {
    locale: Locale;
};

export const LocaleContext = React.createContext<LocaleContextProps>({
    locale: {
        code: 'ru-RU',
        lang: Lang.Ru,
        langName: 'Русский',
    },
});
