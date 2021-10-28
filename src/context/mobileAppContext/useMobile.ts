import React from 'react';
import {MobileAppContext, MobileAppContextProps as Props} from './MobileAppContext';

export function useMobile(): [Props['mobile'], Props['setMobile']] {
    const {mobile, setMobile} = React.useContext(MobileAppContext);
    return [mobile, setMobile];
}
