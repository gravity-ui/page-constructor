import React from 'react';
import {MobileAppContext, MobileAppContextProps as Props} from './MobileAppContext';

export function usePlatform(): [Props['platform'], Props['setPlatform']] {
    const {platform, setPlatform} = React.useContext(MobileAppContext);
    return [platform, setPlatform];
}
