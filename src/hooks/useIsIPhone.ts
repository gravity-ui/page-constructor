import {useContext} from 'react';

import {DeviceContext} from '../contexts/DeviceContext';

export const useIsIPhone = () => {
    const {device} = useContext(DeviceContext);

    return device?.model === 'iPhone';
};
