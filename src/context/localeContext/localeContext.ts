import React from 'react';
import {Lang} from '../../utils/configure';

export type LocaleContextProps = {
    lang?: Lang;
    tld?: string;
};

export const LocaleContext = React.createContext<LocaleContextProps>({lang: Lang.Ru, tld: '.ru'});
