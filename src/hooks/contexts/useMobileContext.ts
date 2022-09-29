import {useContext} from 'react';

import {MobileContext} from '../../contexts/MobileContext';

export const useMobileContext = () => {
    const mobileContextData = useContext(MobileContext);

    return mobileContextData;
};
