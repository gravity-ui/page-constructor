import * as React from 'react';

import {Lang} from '@gravity-ui/uikit';

export type LocaleContextProps = {
    lang?: `${Lang}`;
    tld?: string;
};

export const LocaleContext = React.createContext<LocaleContextProps>({lang: Lang.Ru, tld: '.ru'});
