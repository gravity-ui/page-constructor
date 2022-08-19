import React from 'react';

export interface TranslationContextProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    i18n?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    i18nK?: any;
}

export const TranslationContext = React.createContext<TranslationContextProps>({
    i18n: (str: string) => str,
});
