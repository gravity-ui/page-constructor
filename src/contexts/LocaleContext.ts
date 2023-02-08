import React from 'react';
import {Lang, Locale} from '../models/locale';

export type LocaleContextProps = {
    locale: Locale;
};

export const LocaleContext = React.createContext<LocaleContextProps>({
    locale: {
        code: 'en-En',
        lang: Lang.En,
        langName: 'English',
        pathPrefix: 'en',
    },
});
