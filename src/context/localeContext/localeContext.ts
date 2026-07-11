import * as React from 'react';

import {Lang} from '@gravity-ui/uikit';

export type LocaleContextProps = {
    lang?: `${Lang}`;
    tld?: string;
};

export const initialLocale: LocaleContextProps = {lang: Lang.Ru, tld: '.ru'};

const isRscServer = typeof React.createContext !== 'function';

export const LocaleContext = (
    isRscServer ? null : React.createContext<LocaleContextProps>(initialLocale)
) as React.Context<LocaleContextProps>;
