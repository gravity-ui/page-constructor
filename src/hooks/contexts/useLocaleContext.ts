import {useContext} from 'react';

import {LocaleContext} from '../../contexts/LocaleContext';

export const useLocaleContext = () => {
    const localeContextData = useContext(LocaleContext);

    return localeContextData;
};
