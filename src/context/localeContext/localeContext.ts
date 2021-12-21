import React from 'react';

export enum Lang {
    Ru = 'ru',
    En = 'en',
}

export type LocaleContextProps = {
    lang?: Lang;
    tld?: string;
};

export const LocaleContext = React.createContext<LocaleContextProps>({lang: Lang.Ru, tld: '.ru'});
